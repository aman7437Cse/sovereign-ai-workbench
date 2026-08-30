import datetime
import threading
from typing import List, Dict, Any, Optional

class AuditLogger:
    """
    Structured audit logger for sovereign operations.
    Re-entrant RLock prevents deadlock.
    """
    _instance = None
    _lock = threading.RLock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(AuditLogger, cls).__new__(cls)
                cls._instance._init()
            return cls._instance

    def _init(self):
        self.logs: List[Dict[str, Any]] = []
        self.log_event("SYSTEM", "STARTUP", "Sovereign AI Engine", "Local Runtime", "SUCCESS")

    def log_event(self, user: str, action: str, resource: str, model: Optional[str] = None, status: str = "SUCCESS", details: str = ""):
        with self._lock:
            entry = {
                "id": f"AUD-{len(self.logs)+1001}",
                "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "user": user,
                "action": action,
                "resource": resource,
                "model": model or "N/A",
                "status": status,
                "details": details
            }
            self.logs.insert(0, entry)
            if len(self.logs) > 500:
                self.logs.pop()

    def get_logs(self, limit: int = 100) -> List[Dict[str, Any]]:
        with self._lock:
            return self.logs[:limit]

audit_logger = AuditLogger()
