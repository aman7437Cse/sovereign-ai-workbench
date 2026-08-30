from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional

class ModelAdapter(ABC):
    """
    Abstract Model Adapter interface for Sovereign AI Workbench.
    Supports plugging in Ollama, llama.cpp, vLLM, Transformers, or local demo engines.
    """

    @abstractmethod
    def generate(self, prompt: str, system_prompt: Optional[str] = None, context: Optional[List[Dict[str, Any]]] = None) -> str:
        """Generate text output synchronously."""
        pass

    @abstractmethod
    def analyze_image(self, image_path: str, prompt: str) -> Dict[str, Any]:
        """Analyze an image or scanned document page."""
        pass

    @abstractmethod
    def get_capabilities(self) -> List[str]:
        """Return list of model capabilities (e.g. ['reasoning', 'coding', 'vision'])."""
        pass

    @abstractmethod
    def health_check(self) -> bool:
        """Check if model engine is reachable locally."""
        pass
