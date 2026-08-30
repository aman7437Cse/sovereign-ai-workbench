import os
import sys
import pytest
from backend.models.router import model_router
from backend.tools.ocr_tool import ocr_tool
from backend.tools.vision_tool import vision_tool
from backend.rag.vector_store import vector_store
from backend.sandbox.execution_environment import code_sandbox
from backend.tools.doc_gen_tool import doc_gen_tool
from backend.tools.ppt_gen_tool import ppt_gen_tool
from backend.tools.excel_tool import excel_tool
from backend.security.network_monitor import network_monitor
from backend.agent.engine import agent_engine

def test_model_router_classification():
    r1 = model_router.route_task("Summarize inspection report PDF", ["report.pdf"])
    assert r1["task_type"] == "DOCUMENT"
    assert r1["selected_model_id"] == "Sovereign-General-v1"

    r2 = model_router.route_task("Write python program to test telemetry")
    assert r2["task_type"] == "CODING"
    assert r2["selected_model_id"] == "Sovereign-Coder-v1"

    r3 = model_router.route_task("Analyze engineering drawing diagram", ["drawing.png"])
    assert r3["task_type"] == "VISION"
    assert r3["selected_model_id"] == "Sovereign-Vision-v1"

    r4 = model_router.route_task("Calculate monthly maintenance budget spreadsheet", ["data.xlsx"])
    assert r4["task_type"] == "SPREADSHEET"
    assert r4["selected_model_id"] == "Sovereign-Data-v1"

def test_ocr_and_vision_tools():
    res_ocr = ocr_tool.process_file("nonexistent.pdf")
    assert res_ocr["success"] == False

    res_vis = vision_tool.analyze_image("sample_drawing.png")
    assert res_vis["success"] == True
    assert len(res_vis["visual_objects"]) > 0

def test_rag_vector_search():
    vector_store.chunks = [
        {"id": "c1", "source": "SOP_Test.pdf", "content": "Ultrasonic wall thinning threshold limit is 15.0 percent."}
    ]
    results = vector_store.search("wall thinning threshold")
    assert len(results) > 0
    assert "SOP_Test.pdf" in results[0]["source"]

def test_code_sandbox():
    code = "print(2 + 2)"
    res = code_sandbox.execute_python_code(code)
    assert res["success"] == True
    assert "4" in res["stdout"]

def test_document_generators():
    docx_path = doc_gen_tool.generate_approval_note(
        title="TEST APPROVAL NOTE",
        summary="Test Executive Summary",
        findings=["Finding 1", "Finding 2"],
        sop_citation="SOP #123",
        filename="Test_Approval.docx"
    )
    assert os.path.exists(docx_path)
    assert os.path.getsize(docx_path) > 0

    ppt_path = ppt_gen_tool.generate_presentation(
        title="TEST PRESENTATION",
        slides_data=[{"header": "Slide 1", "bullets": ["Bullet A", "Bullet B"]}],
        filename="Test_Deck.pptx"
    )
    assert os.path.exists(ppt_path)
    assert os.path.getsize(ppt_path) > 0

    xlsx_path = excel_tool.process_and_generate(
        headers=["ID", "Name"],
        rows=[[1, "Item A"]],
        filename="Test_Sheet.xlsx"
    )
    assert os.path.exists(xlsx_path)
    assert os.path.getsize(xlsx_path) > 0

def test_security_network_telemetry():
    telemetry = network_monitor.get_telemetry()
    assert telemetry["air_gapped_mode"] == True
    assert telemetry["data_exfiltrated_mb"] == 0

def test_flagship_agent_workflow():
    res = agent_engine.run_agent("Analyze inspection report and generate approval note", ["sample.pdf"])
    assert res["task_type"] == "DOCUMENT"
    assert res["deliverable"] is not None
    assert "Approval_Note" in res["deliverable"]["name"]

if __name__ == "__main__":
    print("1. Running test_model_router_classification...", flush=True)
    test_model_router_classification()
    print("2. Running test_ocr_and_vision_tools...", flush=True)
    test_ocr_and_vision_tools()
    print("3. Running test_rag_vector_search...", flush=True)
    test_rag_vector_search()
    print("4. Running test_code_sandbox...", flush=True)
    test_code_sandbox()
    print("5. Running test_document_generators...", flush=True)
    test_document_generators()
    print("6. Running test_security_network_telemetry...", flush=True)
    test_security_network_telemetry()
    print("7. Running test_flagship_agent_workflow...", flush=True)
    test_flagship_agent_workflow()
    print("ALL BACKEND TESTS PASSED SUCCESSFULLY!", flush=True)
