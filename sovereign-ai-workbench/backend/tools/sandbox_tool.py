from typing import Dict, Any
from backend.sandbox.execution_environment import code_sandbox

class SandboxTool:
    """
    Safe Code Sandbox Execution Tool.
    Runs python script in restricted sandbox and returns stdout/stderr.
    """

    def run_code(self, code: str) -> Dict[str, Any]:
        result = code_sandbox.execute_python_code(code)
        return {
            "success": result["success"],
            "stdout": result["stdout"],
            "stderr": result["stderr"],
            "duration_sec": result["duration_sec"]
        }

sandbox_tool = SandboxTool()
