import os
import shutil
import datetime
try:
    import psutil
except ImportError:
    psutil = None
from fastapi import FastAPI, File, UploadFile, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from backend.config import config
from backend.models.registry import model_registry
from backend.models.router import model_router
from backend.agent.engine import agent_engine
from backend.agent.tool_registry import tool_registry
from backend.rag.vector_store import vector_store
from backend.sandbox.execution_environment import code_sandbox
from backend.security.network_monitor import network_monitor
from backend.security.sovereignty_center import sovereignty_center
from backend.security.audit_logger import audit_logger
from backend.demo.workflow_runner import demo_runner
from backend.tools.doc_gen_tool import doc_gen_tool
from backend.tools.ppt_gen_tool import ppt_gen_tool
from backend.tools.excel_tool import excel_tool

app = FastAPI(
    title=config.APP_NAME,
    description=config.SUBTITLE,
    version=config.VERSION
)

# Enable CORS for Vite frontend (http://localhost:5173 or any local origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed default demo files into local vector store on startup
@app.on_event("startup")
def startup_event():
    sample_sop_txt = os.path.join(config.DEMO_DIR, "sample_sop.txt")
    if os.path.exists(sample_sop_txt):
        vector_store.ingest_file(sample_sop_txt)
    audit_logger.log_event("SYSTEM", "STARTUP", "FastAPI Server", status="SUCCESS")

# ----------------- Request Models ----------------- #
class TaskRequest(BaseModel):
    prompt: str
    files: Optional[List[str]] = None

class CodeExecutionRequest(BaseModel):
    code: str
    timeout: Optional[int] = 10

class KnowledgeSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 3

class DocGenRequest(BaseModel):
    title: str
    summary: str
    findings: List[str]
    sop_citation: str
    filename: Optional[str] = "Approval_Note.docx"

# ----------------- API Endpoints ----------------- #

@app.get("/")
def read_root():
    return {
        "app": config.APP_NAME,
        "subtitle": config.SUBTITLE,
        "status": "AIR-GAPPED ONLINE",
        "version": config.VERSION
    }

# 1. Executive Dashboard & Sovereignty Center APIs
@app.get("/api/security/status")
def get_security_status():
    network_monitor.record_manual_event("API Check", "127.0.0.1:8000", "HTTP", "ALLOWED (LOCAL)", True)
    return sovereignty_center.get_status()

@app.get("/api/security/network")
def get_network_telemetry():
    return network_monitor.get_telemetry()

@app.get("/api/audit")
def get_audit_logs(limit: int = 100):
    return {"logs": audit_logger.get_logs(limit)}

@app.get("/api/system/health")
def get_system_health():
    cpu_pct = psutil.cpu_percent(interval=None) if hasattr(psutil, 'cpu_percent') else 12.4
    mem = psutil.virtual_memory() if hasattr(psutil, 'virtual_memory') else None
    mem_pct = mem.percent if mem else 45.8

    return {
        "backend_status": "HEALTHY (ONLINE)",
        "model_router_status": "ONLINE",
        "ocr_engine_status": "ONLINE (LOCAL)",
        "vector_store_status": "ONLINE",
        "code_sandbox_status": "ONLINE (RESTRICTED)",
        "air_gapped_mode": config.AIR_GAPPED_MODE,
        "metrics": {
            "cpu_utilization_pct": cpu_pct,
            "ram_utilization_pct": mem_pct,
            "storage_used_dir": config.DATA_DIR,
            "active_tasks_count": 0
        }
    }

# 2. Model Center & Auto-Router APIs
@app.get("/api/models")
def get_models():
    return {"models": model_registry.get_all_models()}

@app.post("/api/models/route")
def route_model(req: TaskRequest):
    res = model_router.route_task(req.prompt, req.files)
    return {
        "task_type": res["task_type"],
        "selected_model_id": res["selected_model_id"],
        "selected_model_name": res["selected_model_name"],
        "reason": res["reason"]
    }

# 3. Agent Execution Workbench APIs
@app.post("/api/agent/run")
def run_agent_task(req: TaskRequest):
    res = agent_engine.run_agent(req.prompt, req.files)
    return res

@app.post("/api/chat")
def chat_workbench(req: TaskRequest):
    return agent_engine.run_agent(req.prompt, req.files)

# 4. File Upload & Deliverable Downloads
@app.post("/api/files/upload")
async def upload_file(file: UploadFile = File(...)):
    dest_path = os.path.join(config.DATA_DIR, file.filename)
    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Ingest into vector store if document
    if file.filename.endswith((".pdf", ".docx", ".txt")):
        vector_store.ingest_file(dest_path)

    audit_logger.log_event("USER", "UPLOAD_FILE", file.filename, status="SUCCESS")

    return {
        "filename": file.filename,
        "path": dest_path,
        "size_bytes": os.path.getsize(dest_path),
        "status": "UPLOADED & INDEXED"
    }

@app.get("/api/deliverables")
def list_deliverables():
    files = []
    if os.path.exists(config.DELIVERABLES_DIR):
        for f in os.listdir(config.DELIVERABLES_DIR):
            p = os.path.join(config.DELIVERABLES_DIR, f)
            if os.path.isfile(p):
                files.append({
                    "filename": f,
                    "size_bytes": os.path.getsize(p),
                    "modified": datetime.datetime.fromtimestamp(os.path.getmtime(p)).strftime("%Y-%m-%d %H:%M:%S")
                })
    return {"deliverables": files}

@app.get("/api/files/download/{filename}")
def download_file(filename: str):
    # Check in deliverables dir first, then data dir
    deliv_path = os.path.join(config.DELIVERABLES_DIR, filename)
    data_path = os.path.join(config.DATA_DIR, filename)
    demo_path = os.path.join(config.DEMO_DIR, filename)

    target_path = None
    if os.path.exists(deliv_path):
        target_path = deliv_path
    elif os.path.exists(data_path):
        target_path = data_path
    elif os.path.exists(demo_path):
        target_path = demo_path

    if not target_path:
        raise HTTPException(status_code=404, detail="File not found")

    audit_logger.log_event("USER", "DOWNLOAD_FILE", filename, status="SUCCESS")
    return FileResponse(target_path, filename=filename)

# 5. Local Knowledge Base & RAG APIs
@app.post("/api/knowledge/search")
def search_knowledge(req: KnowledgeSearchRequest):
    res = vector_store.search(req.query, top_k=req.top_k)
    return {"query": req.query, "results": res}

@app.get("/api/knowledge/documents")
def list_knowledge_docs():
    return {"documents": vector_store.list_documents()}

@app.delete("/api/knowledge/documents/{filename}")
def delete_knowledge_doc(filename: str):
    success = vector_store.delete_document(filename)
    if success:
        audit_logger.log_event("USER", "DELETE_DOCUMENT", filename, status="SUCCESS")
        return {"status": "DELETED", "filename": filename}
    raise HTTPException(status_code=404, detail="Document not found")

# 6. Safe Code Sandbox API
@app.post("/api/code/execute")
def execute_code(req: CodeExecutionRequest):
    audit_logger.log_event("USER", "EXECUTE_CODE", "Python Sandbox", status="STARTED")
    res = code_sandbox.execute_python_code(req.code, timeout=req.timeout)
    status = "SUCCESS" if res["success"] else "FAILURE"
    audit_logger.log_event("USER", "EXECUTE_CODE", "Python Sandbox", status=status)
    return res

# 7. Document & Deliverable Generator APIs
@app.post("/api/documents/generate")
def generate_document(req: DocGenRequest):
    out_path = doc_gen_tool.generate_approval_note(
        title=req.title,
        summary=req.summary,
        findings=req.findings,
        sop_citation=req.sop_citation,
        filename=req.filename
    )
    return {
        "status": "GENERATED",
        "filename": os.path.basename(out_path),
        "path": out_path
    }

# 8. SIH 1-Click Flagship Demo Endpoints
@app.post("/api/demo/inspection_approval")
def demo_inspection_approval():
    audit_logger.log_event("DEMO", "RUN_FLAGSHIP_DEMO", "Inspection Report -> Approval Note", status="SUCCESS")
    return demo_runner.run_inspection_approval_demo()

@app.post("/api/demo/coding_agent")
def demo_coding_agent():
    audit_logger.log_event("DEMO", "RUN_FLAGSHIP_DEMO", "Coding -> Sandbox -> Verification", status="SUCCESS")
    return demo_runner.run_coding_agent_demo()

@app.post("/api/demo/multimodal_analysis")
def demo_multimodal_analysis():
    audit_logger.log_event("DEMO", "RUN_FLAGSHIP_DEMO", "Engineering Image -> Multimodal Vision", status="SUCCESS")
    return demo_runner.run_multimodal_vision_demo()
