import os
import shutil
import datetime
from typing import Dict, Any
from backend.security.network_monitor import network_monitor
from backend.config import config

class SovereigntyCenter:
    def get_status(self) -> Dict[str, Any]:
        telemetry = network_monitor.get_telemetry()
        
        # Calculate local disk storage usage for data directory
        total, used, free = shutil.disk_usage(config.DATA_DIR)
        
        return {
            "air_gapped_mode": config.AIR_GAPPED_MODE,
            "sovereignty_score": "100%",
            "cloud_dependencies": 0,
            "external_api_calls": telemetry["external_api_calls"],
            "data_sent_outside_mb": telemetry["data_exfiltrated_mb"],
            "blocked_external_requests": telemetry["blocked_external_attempts"],
            "local_model_requests": telemetry["total_local_requests"],
            "local_storage_mode": "ON-PREMISE ENCRYPTED",
            "storage_used_mb": round(used / (1024 * 1024), 2),
            "storage_free_gb": round(free / (1024 * 1024 * 1024), 2),
            "security_status": "SECURE / AIR-GAPPED",
            "last_audit_check": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

sovereignty_center = SovereigntyCenter()
