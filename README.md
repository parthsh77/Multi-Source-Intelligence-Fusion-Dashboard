<div align="center">
```
███████╗████████╗██████╗  █████╗ ████████╗███████╗██╗   ██╗███████╗██╗ ██████╗ ███╗   ██╗
██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██║   ██║██╔════╝██║██╔═══██╗████╗  ██║
███████╗   ██║   ██████╔╝███████║   ██║   █████╗  ██║   ██║███████╗██║██║   ██║██╔██╗ ██║
╚════██║   ██║   ██╔══██╗██╔══██║   ██║   ██╔══╝  ██║   ██║╚════██║██║██║   ██║██║╚██╗██║
███████║   ██║   ██║  ██║██║  ██║   ██║   ██║     ╚██████╔╝███████║██║╚██████╔╝██║ ╚████║
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
```
◈ MULTI-SOURCE INTELLIGENCE FUSION SYSTEM · v4.2.1 ◈
![Python](https://img.shields.io/badge/Python-3.11+-00e5ff?style=for-the-badge&logo=python&logoColor=00e5ff&labelColor=030a0f)
![Flask](https://img.shields.io/badge/Flask-3.0-00e5ff?style=for-the-badge&logo=flask&logoColor=00e5ff&labelColor=030a0f)
![Leaflet](https://img.shields.io/badge/Leaflet.js-1.9-00e5ff?style=for-the-badge&logo=leaflet&logoColor=00e5ff&labelColor=030a0f)
![License](https://img.shields.io/badge/LICENSE-MIT-ff6b35?style=for-the-badge&labelColor=030a0f)
[![Classification](https://img.shields.io/badge/CLASSIFICATION-TOP%20SECRET-ff1744?style=for-the-badge&labelColor=030a0f)]()
[![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-69f0ae?style=for-the-badge&labelColor=030a0f)]()
<br/>
> **A centralized Strategic Fusion Dashboard** for ingesting, fusing, and visualizing  
> multi-modal intelligence data — OSINT, HUMINT, and IMINT — on a single unified geospatial interface.
<br/>
---
</div>
🛰️ SYSTEM OVERVIEW
```
┌─────────────────────────────────────────────────────────────────┐
│                    STRATFUSION ARCHITECTURE                      │
│                                                                  │
│   DATA SOURCES          BACKEND            FRONTEND             │
│                                                                  │
│  ┌──────────┐          ┌────────┐         ┌──────────────────┐  │
│  │  MongoDB │ ──────►  │        │ ──────► │   Leaflet Map    │  │
│  └──────────┘          │ Flask  │         │   Dark Terrain   │  │
│  ┌──────────┐          │  API   │ ──────► │   Intel Markers  │  │
│  │   AWS S3 │ ──────►  │        │         │   Hover Modals   │  │
│  └──────────┘          └────────┘         └──────────────────┘  │
│  ┌──────────┐               ▲                                    │
│  │ CSV/JSON │ ──────────────┘                                    │
│  └──────────┘                                                    │
│  ┌──────────┐                                                    │
│  │ JPG/IMINT│ ──────────────┘                                    │
│  └──────────┘                                                    │
└─────────────────────────────────────────────────────────────────┘
```
<br/>
⚡ FEATURES
<table>
<tr>
<td width="50%">
🗺️ Geospatial Intelligence Map
High-fidelity dark terrain map
Real-time coordinate tracking
Zoom + pan navigation
Auto-centered on India region
🔵 Multi-Source Data Fusion
OSINT — Open Source Intelligence (Cyan)
HUMINT — Human Intelligence (Orange)
IMINT — Imagery Intelligence (Purple)
🎯 Interactive Intel Markers
Pulsing animated dots per intel type
Click-to-expand full detail modal
IMINT imagery display in popup
Threat level visual indicators
</td>
<td width="50%">
📥 Multi-Format Data Ingestion
MongoDB — NoSQL cloud database
AWS S3 — Cloud object storage
CSV / Excel — Drag & drop upload
JSON — Structured field reports
JPG / JPEG — Satellite imagery
🔍 Advanced Filtering
Filter by intel type (OSINT/HUMINT/IMINT)
Filter by threat level (Critical/High/Med/Low)
Live intel feed sidebar
Real-time node count stats
🖥️ Professional HUD Interface
Military-grade dark cyber aesthetic
Live UTC clock
Classification header banner
Scanline overlay effect
</td>
</tr>
</table>
<br/>
🚀 QUICK START
Prerequisites
```bash
Python 3.11+    Git    pip
```
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
Access Dashboard
```
http://localhost:5000
```
> 🟢 **SYSTEM ONLINE** — Dashboard operational at port 5000
<br/>
📁 PROJECT STRUCTURE
```
Multi-Source-Intelligence-Fusion-Dashboard/
│
├── 📄 app.py                    # Flask backend & API routes
├── 📄 config.py                 # Configuration (MongoDB, S3, keys)
├── 📄 requirements.txt          # Python dependencies
│
├── 📂 data/
│   └── 📄 sample_intel.json     # Pre-loaded demo intelligence nodes
│
├── 📂 static/
│   ├── 📂 css/
│   │   └── 🎨 style.css         # Military dark cyber theme
│   ├── 📂 js/
│   │   └── ⚙️  dashboard.js     # Map, markers, filters, upload logic
│   └── 📂 images/
│       └── 🛰️  sample_imint.jpg # Sample satellite imagery
│
├── 📂 templates/
│   └── 🌐 index.html            # Main dashboard UI
│
├── 📂 uploads/                  # Drag-drop file landing zone
└── 📄 .gitignore
```
<br/>
🔌 API ENDPOINTS
Method	Endpoint	Description
`GET`	`/`	Serve main dashboard
`GET`	`/api/intel`	Fetch all intel nodes (MongoDB + S3 + local)
`POST`	`/api/upload`	Upload CSV / JSON / JPG intel data
`GET`	`/api/stats`	Get node counts by type & threat level
<br/>
📡 DATA INGESTION FORMATS
CSV Upload Format
```csv
type,title,lat,lng,description,threat_level
OSINT,Signal Intercept Delhi,28.6139,77.2090,Unusual comms activity,medium
HUMINT,Field Agent Report,19.0760,72.8777,Agent sighting confirmed,high
IMINT,Satellite Pass Sector 4,26.9124,75.7873,Aerial recon complete,critical
```
JSON Upload Format
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
<br/>
⚙️ CONFIGURATION
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
> ⚠️ Never commit your `.env` file — it's already in `.gitignore`
<br/>
🎨 TECH STACK
<div align="center">
Layer	Technology
Backend	![Python](https://img.shields.io/badge/-Python-030a0f?style=flat-square&logo=python&logoColor=00e5ff) ![Flask](https://img.shields.io/badge/-Flask-030a0f?style=flat-square&logo=flask&logoColor=00e5ff)
Frontend	![HTML5](https://img.shields.io/badge/-HTML5-030a0f?style=flat-square&logo=html5&logoColor=ff6b35) ![CSS3](https://img.shields.io/badge/-CSS3-030a0f?style=flat-square&logo=css3&logoColor=00e5ff) ![JavaScript](https://img.shields.io/badge/-JavaScript-030a0f?style=flat-square&logo=javascript&logoColor=ffca28)
Map Engine	![Leaflet](https://img.shields.io/badge/-Leaflet.js-030a0f?style=flat-square&logo=leaflet&logoColor=69f0ae) OpenStreetMap
Database	![MongoDB](https://img.shields.io/badge/-MongoDB-030a0f?style=flat-square&logo=mongodb&logoColor=69f0ae)
Cloud	![AWS](https://img.shields.io/badge/-AWS%20S3-030a0f?style=flat-square&logo=amazons3&logoColor=ff6b35)
Fonts	Orbitron · Rajdhani · Share Tech Mono
</div>
<br/>
🗺️ INTEL NODE TYPES
```
  ● OSINT  — Open Source Intelligence
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Color   : Cyan  (#00e5ff)
  Sources : Social media, news feeds, public databases
  Format  : CSV, JSON, MongoDB

  ● HUMINT — Human Intelligence  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Color   : Orange (#ff6b35)
  Sources : Field agent reports, informants
  Format  : CSV, JSON manual upload

  ● IMINT  — Imagery Intelligence
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Color   : Purple (#7c4dff)
  Sources : Satellite imagery, UAV feeds
  Format  : JPG/JPEG with coordinates
```
<br/>
🚨 THREAT LEVELS
Level	Color	Description
🔴 `CRITICAL`	`#ff1744`	Immediate action required
🟠 `HIGH`	`#ff6b35`	Elevated threat, monitor closely
🟡 `MEDIUM`	`#ffca28`	Notable activity, standard watch
🟢 `LOW`	`#69f0ae`	Routine intelligence, log only
<br/>
🛣️ ROADMAP
[x] Multi-source data ingestion (CSV, JSON, JPG)
[x] Interactive geospatial map with Leaflet.js
[x] Threat level filtering system
[x] IMINT imagery modal display
[x] MongoDB + AWS S3 integration
[ ] 🔐 Login / Authentication screen
[ ] 📊 Threat analytics chart panel
[ ] 🔴 Live alert notification system
[ ] 📤 Export intel reports as PDF
[ ] 🌐 Multi-user collaborative mode
<br/>
👤 AUTHOR
<div align="center">
Parth Shrivastava
![GitHub](https://img.shields.io/badge/GitHub-parthsh77-00e5ff?style=for-the-badge&logo=github&labelColor=030a0f)
</div>
<br/>
---
<div align="center">
```
◈ STRATFUSION · MULTI-SOURCE INTELLIGENCE FUSION SYSTEM ◈
CLASSIFICATION: TOP SECRET // EYES ONLY
```
![visitors](https://visitor-badge.laobi.icu/badge?page_id=parthsh77.Multi-Source-Intelligence-Fusion-Dashboard&left_color=030a0f&right_color=00e5ff)
Built with 🔵 for national security awareness
</div>