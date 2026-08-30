import json
import urllib.request
import urllib.error
from typing import Dict, Any, List, Optional
from backend.models.adapter_base import ModelAdapter
from backend.models.local_fallback_adapter import LocalFallbackAdapter

class OllamaAdapter(ModelAdapter):
    """
    Adapter for locally hosted Ollama or llama.cpp OpenAI-compatible HTTP servers.
    Communicates purely over localhost (127.0.0.1).
    """

    def __init__(self, model_name: str = "llama3:8b", endpoint: str = "http://127.0.0.1:11434"):
        self.model_name = model_name
        self.endpoint = endpoint.rstrip("/")
        self.fallback = LocalFallbackAdapter(model_name=f"{model_name}-fallback")

    def generate(self, prompt: str, system_prompt: Optional[str] = None, context: Optional[List[Dict[str, Any]]] = None) -> str:
        if not self.health_check():
            return self.fallback.generate(prompt, system_prompt, context)
            
        url = f"{self.endpoint}/api/generate"
        payload = {
            "model": self.model_name,
            "prompt": prompt,
            "stream": False
        }
        if system_prompt:
            payload["system"] = system_prompt
            
        try:
            req = urllib.request.Request(
                url, 
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                return data.get("response", "")
        except Exception:
            return self.fallback.generate(prompt, system_prompt, context)

    def analyze_image(self, image_path: str, prompt: str) -> Dict[str, Any]:
        return self.fallback.analyze_image(image_path, prompt)

    def get_capabilities(self) -> List[str]:
        return ["reasoning", "coding", "vision", "local_http"]

    def health_check(self) -> bool:
        try:
            url = f"{self.endpoint}/api/tags"
            req = urllib.request.Request(url, method="GET")
            with urllib.request.urlopen(req, timeout=2) as resp:
                return resp.status == 200
        except Exception:
            return False
