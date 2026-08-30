from typing import Dict, Any, List
from backend.models.adapter_base import ModelAdapter
from backend.models.local_fallback_adapter import LocalFallbackAdapter
from backend.models.ollama_adapter import OllamaAdapter

class ModelRegistry:
    def __init__(self):
        self.models: Dict[str, Dict[str, Any]] = {
            "Sovereign-General-v1": {
                "id": "Sovereign-General-v1",
                "name": "Sovereign Deep Reasoner",
                "provider": "Local Open-Weight (Qwen/Llama Air-Gapped)",
                "type": "General Reasoning & Document Synthesis",
                "capabilities": ["Reasoning", "SOP Retrieval", "Report Drafting", "Verification"],
                "context_length": "32,768 tokens",
                "gpu_requirement": "8 GB VRAM (or CPU fallback)",
                "status": "ONLINE (AIR-GAPPED)",
                "adapter": LocalFallbackAdapter(model_name="Sovereign-General-v1", model_type="general")
            },
            "Sovereign-Coder-v1": {
                "id": "Sovereign-Coder-v1",
                "name": "Sovereign Code Architect",
                "provider": "Local Open-Weight (StarCoder2 / DeepSeek-Coder)",
                "type": "Code Generation & Self-Debugging Sandbox Engine",
                "capabilities": ["Python", "C/C++", "SQL", "Automated Debugging", "Unit Testing"],
                "context_length": "64,000 tokens",
                "gpu_requirement": "12 GB VRAM (or CPU fallback)",
                "status": "ONLINE (AIR-GAPPED)",
                "adapter": LocalFallbackAdapter(model_name="Sovereign-Coder-v1", model_type="coding")
            },
            "Sovereign-Vision-v1": {
                "id": "Sovereign-Vision-v1",
                "name": "Sovereign Industrial Multimodal Vision",
                "provider": "Local Open-Weight (LLaVA / Qwen2-VL)",
                "type": "Engineering Drawing & Photo Diagnostics",
                "capabilities": ["OCR Text Extraction", "Object Detection", "Defect Labeling", "Diagram Reading"],
                "context_length": "16,384 tokens",
                "gpu_requirement": "16 GB VRAM (or CPU fallback)",
                "status": "ONLINE (AIR-GAPPED)",
                "adapter": LocalFallbackAdapter(model_name="Sovereign-Vision-v1", model_type="vision")
            },
            "Sovereign-Data-v1": {
                "id": "Sovereign-Data-v1",
                "name": "Sovereign Analytical Spreadsheet Engine",
                "provider": "Local Open-Weight (CodeLlama-Instruct)",
                "type": "Excel & Tabular Computation",
                "capabilities": ["XLSX Processing", "Financial Calculation", "Pivot Aggregation", "Trend Detection"],
                "context_length": "32,768 tokens",
                "gpu_requirement": "8 GB VRAM (or CPU fallback)",
                "status": "ONLINE (AIR-GAPPED)",
                "adapter": LocalFallbackAdapter(model_name="Sovereign-Data-v1", model_type="spreadsheet")
            }
        }

    def get_all_models(self) -> List[Dict[str, Any]]:
        result = []
        for key, val in self.models.items():
            item = {k: v for k, v in val.items() if k != "adapter"}
            result.append(item)
        return result

    def get_adapter(self, model_id: str) -> ModelAdapter:
        if model_id in self.models:
            return self.models[model_id]["adapter"]
        # Default fallback adapter
        return self.models["Sovereign-General-v1"]["adapter"]

model_registry = ModelRegistry()
