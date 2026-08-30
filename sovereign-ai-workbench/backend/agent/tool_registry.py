from typing import Dict, Any, List
from backend.tools.ocr_tool import ocr_tool
from backend.tools.vision_tool import vision_tool
from backend.tools.rag_tool import rag_tool
from backend.tools.sandbox_tool import sandbox_tool
from backend.tools.doc_gen_tool import doc_gen_tool
from backend.tools.ppt_gen_tool import ppt_gen_tool
from backend.tools.excel_tool import excel_tool
from backend.tools.calc_tool import calc_tool
from backend.security.audit_logger import audit_logger

class ToolRegistry:
    """
    Approved Tool Registry with strict schemas, permission levels, and audit events.
    Prevents arbitrary unapproved command execution.
    """

    def __init__(self):
        self.tools = {
            "file_ocr": {
                "name": "file_ocr",
                "description": "Extract text from scanned PDFs, images, or documents locally",
                "permission_level": "READ_ONLY",
                "status": "APPROVED",
                "handler": ocr_tool.process_file
            },
            "vision_analysis": {
                "name": "vision_analysis",
                "description": "Analyze technical drawings and engineering photos for defects & annotations",
                "permission_level": "READ_ONLY",
                "status": "APPROVED",
                "handler": vision_tool.analyze_image
            },
            "knowledge_search": {
                "name": "knowledge_search",
                "description": "Search local air-gapped SOP and policy vector store for citations",
                "permission_level": "READ_ONLY",
                "status": "APPROVED",
                "handler": rag_tool.search_knowledge_base
            },
            "code_sandbox": {
                "name": "code_sandbox",
                "description": "Execute Python code inside an isolated restricted sandbox with stdout capture",
                "permission_level": "RESTRICTED_SANDBOX",
                "status": "APPROVED",
                "handler": sandbox_tool.run_code
            },
            "generate_docx": {
                "name": "generate_docx",
                "description": "Generate executive Word (.docx) approval notes & compliance reports",
                "permission_level": "FILE_GENERATION",
                "status": "APPROVED",
                "handler": doc_gen_tool.generate_approval_note
            },
            "generate_pptx": {
                "name": "generate_pptx",
                "description": "Generate management PowerPoint (.pptx) 6-slide decks",
                "permission_level": "FILE_GENERATION",
                "status": "APPROVED",
                "handler": ppt_gen_tool.generate_presentation
            },
            "generate_excel": {
                "name": "generate_excel",
                "description": "Process and export formatted Excel (.xlsx) data workbooks",
                "permission_level": "FILE_GENERATION",
                "status": "APPROVED",
                "handler": excel_tool.process_and_generate
            },
            "calculator": {
                "name": "calculator",
                "description": "Deterministic formula evaluation engine without LLM arithmetic hallucination",
                "permission_level": "READ_ONLY",
                "status": "APPROVED",
                "handler": calc_tool.evaluate_expression
            }
        }

    def list_tools(self) -> List[Dict[str, Any]]:
        return [
            {
                "name": t["name"],
                "description": t["description"],
                "permission_level": t["permission_level"],
                "status": t["status"]
            }
            for t in self.tools.values()
        ]

    def execute_tool(self, tool_name: str, **kwargs) -> Dict[str, Any]:
        if tool_name not in self.tools:
            audit_logger.log_event("AGENT", "EXECUTE_TOOL", tool_name, status="REJECTED", details="Unapproved tool")
            return {"success": False, "error": f"Tool '{tool_name}' is not in approved registry."}

        tool = self.tools[tool_name]
        try:
            res = tool["handler"](**kwargs)
            audit_logger.log_event("AGENT", "EXECUTE_TOOL", tool_name, status="SUCCESS")
            return {"success": True, "result": res}
        except Exception as e:
            audit_logger.log_event("AGENT", "EXECUTE_TOOL", tool_name, status="FAILURE", details=str(e))
            return {"success": False, "error": str(e)}

tool_registry = ToolRegistry()
