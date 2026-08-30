import sys
import subprocess
import tempfile
import os
import time
from typing import Dict, Any

class CodeSandbox:
    """
    Isolated Code Execution Sandbox layer.
    Executes generated python code in restricted subprocess, capturing stdout/stderr safely.
    """

    def execute_python_code(self, code: str, timeout: int = 10) -> Dict[str, Any]:
        with tempfile.TemporaryDirectory(prefix="sovereign_sandbox_") as tmpdir:
            script_path = os.path.join(tmpdir, "sandbox_script.py")
            with open(script_path, "w", encoding="utf-8") as f:
                f.write(code)

            start_time = time.time()
            try:
                # Run script in isolated python process
                proc = subprocess.run(
                    [sys.executable, script_path],
                    cwd=tmpdir,
                    capture_output=True,
                    text=True,
                    timeout=timeout
                )
                duration = round(time.time() - start_time, 3)

                return {
                    "success": proc.returncode == 0,
                    "returncode": proc.returncode,
                    "stdout": proc.stdout,
                    "stderr": proc.stderr,
                    "duration_sec": duration,
                    "executed_at": time.strftime("%Y-%m-%d %H:%M:%S")
                }
            except subprocess.TimeoutExpired:
                duration = round(time.time() - start_time, 3)
                return {
                    "success": False,
                    "returncode": -1,
                    "stdout": "",
                    "stderr": f"Error: Code execution timed out after {timeout} seconds.",
                    "duration_sec": duration,
                    "executed_at": time.strftime("%Y-%m-%d %H:%M:%S")
                }
            except Exception as e:
                return {
                    "success": False,
                    "returncode": -1,
                    "stdout": "",
                    "stderr": f"Execution Environment Exception: {str(e)}",
                    "duration_sec": 0,
                    "executed_at": time.strftime("%Y-%m-%d %H:%M:%S")
                }

code_sandbox = CodeSandbox()
