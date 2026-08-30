import os
from pydantic import BaseModel

class AppConfig(BaseModel):
    APP_NAME: str = "SOVEREIGN AI WORKBENCH"
    SUBTITLE: str = "Private Agentic Intelligence for Confidential Industrial Work"
    VERSION: str = "1.0.0-SIH"
    AIR_GAPPED_MODE: bool = True
    MAX_FILE_SIZE_MB: int = 50
    ALLOW_EXTERNAL_CALLS: bool = False
    SANDBOX_TIMEOUT_SECONDS: int = 10
    DATA_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))
    DEMO_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "demo", "sample_files"))
    DELIVERABLES_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "deliverables"))
    VECTOR_DB_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "vector_db"))

config = AppConfig()

# Ensure directories exist
os.makedirs(config.DATA_DIR, exist_ok=True)
os.makedirs(config.DEMO_DIR, exist_ok=True)
os.makedirs(config.DELIVERABLES_DIR, exist_ok=True)
os.makedirs(config.VECTOR_DB_DIR, exist_ok=True)
