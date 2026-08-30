from typing import Dict, Any, Optional, List
from backend.models.registry import model_registry

class ModelRouter:
    """
    Automatic intent classifier and model router.
    Visually exposes task routing decisions in the UI.
    """

    def route_task(self, prompt: str, files: Optional[List[str]] = None) -> Dict[str, Any]:
        prompt_lower = prompt.lower()
        files = files or []

        has_image = any(f.endswith((".png", ".jpg", ".jpeg", ".bmp", ".tiff")) for f in files)
        has_excel = any(f.endswith((".xlsx", ".xls", ".csv")) for f in files)
        has_pdf = any(f.endswith(".pdf") for f in files)

        # Vision Task
        if has_image or any(w in prompt_lower for w in ["drawing", "image", "photo", "diagram", "schematic", "visual", "valve", "inspection image"]):
            selected_model = "Sovereign-Vision-v1"
            task_type = "VISION"
            reason = "Multimodal image processing, object detection, or engineering drawing analysis required."

        # Coding Task
        elif any(w in prompt_lower for w in ["code", "python", "script", "test", "program", "func", "class", "debug", "algorithm", "syntax"]):
            selected_model = "Sovereign-Coder-v1"
            task_type = "CODING"
            reason = "Code generation, sandbox execution, or unit test verification detected."

        # Spreadsheet / Data Task
        elif has_excel or any(w in prompt_lower for w in ["spreadsheet", "excel", "xlsx", "budget", "expenditure", "cost", "pivot", "rows"]):
            selected_model = "Sovereign-Data-v1"
            task_type = "SPREADSHEET"
            reason = "Tabular data calculation, spreadsheet formula evaluation, or XLSX report requested."

        # Document Task
        elif has_pdf or any(w in prompt_lower for w in ["inspection", "approval", "report", "sop", "policy", "docx", "document", "summarize"]):
            selected_model = "Sovereign-General-v1"
            task_type = "DOCUMENT"
            reason = "Document intelligence, layout extraction, SOP matching, and approval note creation required."

        # General Task
        else:
            selected_model = "Sovereign-General-v1"
            task_type = "GENERAL"
            reason = "General industrial reasoning and multi-tool orchestration."

        adapter = model_registry.get_adapter(selected_model)

        return {
            "task_type": task_type,
            "selected_model_id": selected_model,
            "selected_model_name": model_registry.models[selected_model]["name"],
            "reason": reason,
            "adapter": adapter
        }

model_router = ModelRouter()
