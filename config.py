import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "intel-dashboard-secret-2024")
    UPLOAD_FOLDER = "uploads"
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024

    MONGO_URI = os.getenv("MONGO_URI", "")
    MONGO_DB  = os.getenv("MONGO_DB", "intel_db")

    AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY", "")
    AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY", "")
    S3_BUCKET      = os.getenv("S3_BUCKET", "")