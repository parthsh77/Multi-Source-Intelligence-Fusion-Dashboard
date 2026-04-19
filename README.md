<div align="center">
<h1>◈ STRATFUSION</h1>
<h3>MULTI-SOURCE INTELLIGENCE FUSION SYSTEM · v4.2.1</h3>
<br/>
![Python](https://img.shields.io/badge/Python-3.11+-00e5ff?style=for-the-badge&logo=python&logoColor=white&labelColor=030a0f)
![Flask](https://img.shields.io/badge/Flask-3.0-00e5ff?style=for-the-badge&logo=flask&logoColor=white&labelColor=030a0f)
![Leaflet](https://img.shields.io/badge/Leaflet.js-1.9-00e5ff?style=for-the-badge&logo=leaflet&logoColor=white&labelColor=030a0f)
![License](https://img.shields.io/badge/LICENSE-MIT-ff6b35?style=for-the-badge&labelColor=030a0f)
[![Classification](https://img.shields.io/badge/CLASSIFICATION-TOP%20SECRET-ff1744?style=for-the-badge&labelColor=030a0f)]()
[![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-69f0ae?style=for-the-badge&labelColor=030a0f)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-Ready-69f0ae?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=030a0f)]()
[![AWS](https://img.shields.io/badge/AWS_S3-Ready-ff6b35?style=for-the-badge&logo=amazons3&logoColor=white&labelColor=030a0f)]()
<br/>
> A centralized **Strategic Fusion Dashboard** for ingesting, fusing, and visualizing  
> multi-modal intelligence data — **OSINT**, **HUMINT**, and **IMINT** — on a single unified geospatial interface.
<br/>
---
</div>
🛰️ System Overview
A web-based intelligence platform built on Python (Flask) + Leaflet.js that solves the fragmented data problem in modern intelligence operations. Instead of toggling between spreadsheets, databases, and image viewers, analysts get a single common operating picture anchored to a real-time interactive terrain map.
---
⚡ Features
Feature	Description
🗺️ Geospatial Map	Dark terrain map with real-time coordinate tracking
🔵 OSINT Nodes	Open Source Intelligence — social media, news feeds
🟠 HUMINT Nodes	Human Intelligence — field agent reports
🟣 IMINT Nodes	Imagery Intelligence — satellite & UAV feeds
📥 Multi-Format Ingestion	CSV, Excel, JSON, JPG/JPEG drag & drop upload
🎯 Interactive Markers	Pulsing animated dots, click-to-expand detail modal
🖼️ IMINT Imagery Popup	Satellite images display directly in hover modal
🔍 Advanced Filtering	Filter by type (OSINT/HUMINT/IMINT) and threat level
📊 Live Stats Panel	Real-time node counts in header
☁️ Cloud Ready	MongoDB + AWS S3 integration built-in
---
🚀 Quick Start
Prerequisites
Python 3.11+
pip
Git
Installation
```bash
# 1. Clone the repository
git clone https://github.com/parthsh77/Multi-Source-Intelligence-Fusion-Dashboard.git

# 2. Navigate to project
cd Multi-Source-Intelligence-Fusion-Dashboard

# 3. Install dependencies
pip install flask flask-cors pymongo boto3 Pillow python-dotenv

# 4. Launch the system
python app.py
```
Open Dashboard
```
http://localhost:5000
```
---
📁 Project Structure
```
Multi-Source-Intelligence-Fusion-Dashboard/
│
├── app.py                    # Flask backend & all API routes
├── config.py                 # Configuration (MongoDB, S3, env keys)
├── requirements.txt          # Python dependencies
│
├── data/
│   └── sample_intel.json     # Pre-loaded demo intelligence nodes
│
├── static/
│   ├── css/
│   │   └── style.css         # Military dark cyber theme
│   ├── js/
│   │   └── dashboard.js      # Map, markers, filters, upload logic
│   └── images/
│       └── sample_imint.jpg  # Sample satellite IMINT imagery
│
├── templates/
│   └── index.html            # Main dashboard UI
│
├── uploads/                  # Drag-drop file landing zone
└── .gitignore
```
---
🔌 API Endpoints
Method	Endpoint	Description
`GET`	`/`	Serve the main dashboard
`GET`	`/api/intel`	Fetch all intel nodes (MongoDB + S3 + local JSON)
`POST`	`/api/upload`	Upload CSV / JSON / JPG intel data
`GET`	`/api/stats`	Get node counts by type and threat level
---
📡 Data Ingestion Formats
CSV Format
```csv
type,title,lat,lng,description,threat_level
OSINT,Signal Intercept Delhi,28.6139,77.2090,Unusual comms activity,medium
HUMINT,Field Agent Report,19.0760,72.8777,Agent sighting confirmed,high
IMINT,Satellite Pass Sector 4,26.9124,75.7873,Aerial recon complete,critical
```
JSON Format
```json
[
  {
    "type": "OSINT",
    "title": "Social Media Spike",
    "lat": 28.6139,
    "lng": 77.2090,
    "description": "Unusual activity detected",
    "threat_level": "medium"
  }
]
```
---
⚙️ Configuration
Create a `.env` file in the root directory:
```env
# Flask
SECRET_KEY=your-secret-key-here

# MongoDB (optional)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGO_DB=intel_db

# AWS S3 (optional)
AWS_ACCESS_KEY=your-aws-access-key
AWS_SECRET_KEY=your-aws-secret-key
S3_BUCKET=your-bucket-name
```
> ⚠️ Never commit your `.env` file — it is already in `.gitignore`
---
🎨 Tech Stack
Layer	Technology
Backend	Python 3.11, Flask 3.0, Flask-CORS
Frontend	HTML5, CSS3, Vanilla JavaScript
Map Engine	Leaflet.js 1.9, OpenStreetMap
Database	MongoDB (pymongo)
Cloud Storage	AWS S3 (boto3)
Image Processing	Pillow
Fonts	Orbitron · Rajdhani · Share Tech Mono
---
🚨 Threat Levels
Level	Indicator	Description
🔴 CRITICAL	`#ff1744`	Immediate action required
🟠 HIGH	`#ff6b35`	Elevated threat, monitor closely
🟡 MEDIUM	`#ffca28`	Notable activity, standard watch
🟢 LOW	`#69f0ae`	Routine intelligence, log only
---
🗺️ Intel Node Types
🔵 OSINT — Open Source Intelligence
Color: Cyan `#00e5ff`
Sources: Social media monitoring, news feeds, public databases
Upload formats: CSV, JSON, MongoDB
🟠 HUMINT — Human Intelligence
Color: Orange `#ff6b35`
Sources: Field agent reports, informant debriefs
Upload formats: CSV, JSON manual upload
🟣 IMINT — Imagery Intelligence
Color: Purple `#7c4dff`
Sources: Satellite imagery, UAV surveillance feeds
Upload formats: JPG/JPEG with lat/lng coordinates
---
🛣️ Roadmap
[x] Multi-source data ingestion (CSV, JSON, JPG)
[x] Interactive geospatial map with Leaflet.js
[x] Threat level filtering system
[x] IMINT imagery modal display
[x] MongoDB + AWS S3 integration
[x] Drag & drop file upload
[ ] 🔐 Login / Authentication screen
[ ] 📊 Threat analytics chart panel
[ ] 🔴 Live alert notification system
[ ] 📤 Export intel reports as PDF
[ ] 🌐 Multi-user collaborative mode
---
👤 Author
<div align="center">
Parth Shrivastava
![GitHub](https://img.shields.io/badge/GitHub-parthsh77-00e5ff?style=for-the-badge&logo=github&logoColor=white&labelColor=030a0f)
</div>
---
<div align="center">
◈ STRATFUSION · MULTI-SOURCE INTELLIGENCE FUSION SYSTEM ◈
`CLASSIFICATION: TOP SECRET // EYES ONLY`
![visitors](https://visitor-badge.laobi.icu/badge?page_id=parthsh77.Multi-Source-Intelligence-Fusion-Dashboard&left_color=030a0f&right_color=00e5ff&left_text=VISITORS)
Built for intelligence awareness and situational dominance.
</div>