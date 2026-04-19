# STRATFUSION – Multi-Source Intelligence Fusion Dashboard

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge\&logo=flask\&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet.js-1.9-199900?style=for-the-badge\&logo=leaflet\&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Operational-success?style=for-the-badge)

A centralized intelligence fusion dashboard for ingesting, processing, and visualizing OSINT, HUMINT, and IMINT data on a unified geospatial interface.

</div>

---

## Overview

STRATFUSION is a Flask-based intelligence dashboard designed to combine multiple intelligence sources into a single operational view. The system supports geospatial visualization, file uploads, threat classification, and real-time filtering of intelligence reports.

The platform is built for scenarios involving:

* Open Source Intelligence (OSINT)
* Human Intelligence (HUMINT)
* Imagery Intelligence (IMINT)
* Threat monitoring and situational awareness
* Interactive geospatial analysis

---

## Features

### Geospatial Intelligence Dashboard

* Interactive Leaflet-based map
* Dark-themed military-style interface
* Real-time map navigation and zoom controls
* Marker clustering and coordinate tracking

### Multi-Source Intelligence Fusion

* OSINT support for public-source intelligence
* HUMINT support for field agent reports
* IMINT support for drone and satellite imagery
* Threat-level tagging for each intelligence node

### Data Upload and Integration

* Upload CSV, JSON, Excel, and image files
* MongoDB integration for persistent storage
* AWS S3 integration for image storage
* Local sample dataset support

### Filtering and Analytics

* Filter by intelligence type
* Filter by threat level
* Live statistics panel
* Node count monitoring

---

## System Architecture

```text
Data Sources → Flask Backend → Leaflet Frontend

Sources:
- MongoDB
- AWS S3
- CSV / Excel Files
- JSON Files
- IMINT Images
```

---

## Project Structure

```text
Multi-Source-Intelligence-Fusion-Dashboard/
│
├── app.py
├── config.py
├── requirements.txt
├── README.md
│
├── data/
│   └── sample_intel.json
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── dashboard.js
│   └── images/
│       └── sample_imint.jpg
│
├── templates/
│   └── index.html
│
└── uploads/
```

---

## Installation

### Prerequisites

Make sure the following are installed:

* Python 3.11 or higher
* pip
* Git

### Clone the Repository

```bash
git clone https://github.com/parthsh77/Multi-Source-Intelligence-Fusion-Dashboard.git
cd Multi-Source-Intelligence-Fusion-Dashboard
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

If pip is not recognized on Windows, use:

```bash
py -m pip install -r requirements.txt
```

### Run the Application

```bash
python app.py
```

Or:

```bash
py app.py
```

Open the application in your browser:

```text
http://localhost:5000
```

---

## Configuration

Create a `.env` file in the root directory.

```env
SECRET_KEY=your-secret-key

MONGO_URI=your-mongodb-uri
MONGO_DB=intel_db

AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
S3_BUCKET=your-bucket-name
```

---

## API Endpoints

| Method | Endpoint    | Description                       |
| ------ | ----------- | --------------------------------- |
| GET    | /           | Main dashboard page               |
| GET    | /api/intel  | Retrieve all intelligence records |
| POST   | /api/upload | Upload intelligence files         |
| GET    | /api/stats  | Retrieve dashboard statistics     |

---

## Supported Intelligence Types

### OSINT

Open Source Intelligence gathered from:

* News articles
* Social media
* Public records
* Open databases

### HUMINT

Human Intelligence gathered from:

* Field reports
* Informants
* Human surveillance
* Border and security reports

### IMINT

Imagery Intelligence gathered from:

* Satellite imagery
* Drone surveillance
* Aerial reconnaissance
* UAV feeds

---

## Threat Levels

| Threat Level | Meaning                       |
| ------------ | ----------------------------- |
| Critical     | Immediate action required     |
| High         | Significant risk detected     |
| Medium       | Suspicious activity present   |
| Low          | Minor activity or low concern |

---

## Future Enhancements

* User authentication and login system
* PDF report generation
* Real-time alert notifications
* Threat trend analytics
* Multi-user collaboration
* Role-based access control

---

## Author

Parth Shrivastava

* GitHub: [https://github.com/parthsh77](https://github.com/parthsh77)

---

## License

This project is licensed under the MIT License.
