from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from config import Config
import os, json, uuid, csv, io
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
os.makedirs("static/images", exist_ok=True)

# ─── helpers ────────────────────────────────────────────────────────────────

def load_local_intel():
    try:
        with open("data/sample_intel.json") as f:
            return json.load(f)
    except Exception:
        return []

def load_mongo_intel():
    uri = app.config["MONGO_URI"]
    if not uri:
        return []
    try:
        from pymongo import MongoClient
        client = MongoClient(uri, serverSelectionTimeoutMS=3000)
        db = client[app.config["MONGO_DB"]]
        docs = list(db.intel.find({}, {"_id": 0}))
        client.close()
        return docs
    except Exception as e:
        print(f"[MongoDB] {e}")
        return []

def load_s3_intel():
    if not app.config["AWS_ACCESS_KEY"]:
        return []
    try:
        import boto3
        s3 = boto3.client(
            "s3",
            aws_access_key_id=app.config["AWS_ACCESS_KEY"],
            aws_secret_access_key=app.config["AWS_SECRET_KEY"],
        )
        obj = s3.get_object(Bucket=app.config["S3_BUCKET"], Key="intel_data.json")
        return json.loads(obj["Body"].read())
    except Exception as e:
        print(f"[S3] {e}")
        return []

# ─── routes ─────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/intel", methods=["GET"])
def get_intel():
    data = load_local_intel() + load_mongo_intel() + load_s3_intel()
    seen, unique = set(), []
    for item in data:
        if item.get("id") not in seen:
            seen.add(item["id"])
            unique.append(item)
    return jsonify({"status": "ok", "count": len(unique), "data": unique})

@app.route("/api/upload", methods=["POST"])
def upload():
    results = []

    # ── CSV ──────────────────────────────────────────────────────
    f = request.files.get("csv_file")
    if f:
        try:
            content = f.read().decode("utf-8")
            reader = csv.DictReader(io.StringIO(content))
            for row in reader:
                if "lat" in row and "lng" in row:
                    results.append({
                        "id": f"UPLOAD-{uuid.uuid4().hex[:8].upper()}",
                        "type": row.get("type", "OSINT"),
                        "title": row.get("title", "Uploaded Node"),
                        "lat": float(row["lat"]),
                        "lng": float(row["lng"]),
                        "description": row.get("description", ""),
                        "source": "Manual Upload",
                        "timestamp": datetime.utcnow().isoformat() + "Z",
                        "threat_level": row.get("threat_level", "low"),
                        "image": None
                    })
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    # ── Excel ─────────────────────────────────────────────────────
    ef = request.files.get("excel_file")
    if ef:
        try:
            content = ef.read().decode("utf-8", errors="ignore")
            reader = csv.DictReader(io.StringIO(content))
            for row in reader:
                if "lat" in row and "lng" in row:
                    results.append({
                        "id": f"UPLOAD-{uuid.uuid4().hex[:8].upper()}",
                        "type": row.get("type", "OSINT"),
                        "title": row.get("title", "Uploaded Node"),
                        "lat": float(row["lat"]),
                        "lng": float(row["lng"]),
                        "description": row.get("description", ""),
                        "source": "Manual Upload",
                        "timestamp": datetime.utcnow().isoformat() + "Z",
                        "threat_level": row.get("threat_level", "low"),
                        "image": None
                    })
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    # ── JSON ─────────────────────────────────────────────────────
    jf = request.files.get("json_file")
    if jf:
        try:
            payload = json.load(jf)
            items = payload if isinstance(payload, list) else [payload]
            for item in items:
                if "id" not in item:
                    item["id"] = f"JSON-{uuid.uuid4().hex[:8].upper()}"
            results.extend(items)
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    # ── IMINT image ───────────────────────────────────────────────
    img = request.files.get("image_file")
    if img:
        ext = img.filename.rsplit(".", 1)[-1].lower()
        if ext not in ("jpg", "jpeg", "png", "gif"):
            return jsonify({"status": "error", "message": "Only JPG/PNG images"}), 400
        fname = f"imint_{uuid.uuid4().hex[:8]}.{ext}"
        img.save(os.path.join("static/images", fname))
        lat = float(request.form.get("lat", 28.6139))
        lng = float(request.form.get("lng", 77.2090))
        results.append({
            "id": f"IMINT-{uuid.uuid4().hex[:8].upper()}",
            "type": "IMINT",
            "title": request.form.get("title", img.filename),
            "lat": lat, "lng": lng,
            "description": request.form.get("description", "Uploaded imagery"),
            "source": "Manual IMINT Upload",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "threat_level": request.form.get("threat_level", "medium"),
            "image": f"/static/images/{fname}",
        })

    if not results:
        return jsonify({"status": "error", "message": "No valid data in upload"}), 400

    return jsonify({"status": "ok", "count": len(results), "data": results})

@app.route("/api/stats", methods=["GET"])
def stats():
    data = load_local_intel()
    return jsonify({
        "total": len(data),
        "osint": sum(1 for d in data if d["type"] == "OSINT"),
        "humint": sum(1 for d in data if d["type"] == "HUMINT"),
        "imint": sum(1 for d in data if d["type"] == "IMINT"),
        "critical": sum(1 for d in data if d.get("threat_level") == "critical"),
        "high": sum(1 for d in data if d.get("threat_level") == "high"),
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)