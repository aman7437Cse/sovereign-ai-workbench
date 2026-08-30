import os
from typing import Dict, Any
from backend.agent.engine import agent_engine
from backend.config import config

class FlagshipDemoRunner:
    """
    1-Click SIH Flagship Demo Workflows.
    Allows evaluators to demonstrate the full end-to-end sovereign pipeline cleanly.
    """

    def run_inspection_approval_demo(self) -> Dict[str, Any]:
        prompt = (
            "Analyze this scanned inspection report for Refinery Unit-07 (Pipeline Loop 4B / Valve V-102), "
            "cross-check findings against our local SOP policy for wall thinning tolerances, and generate "
            "a formal Approval Note (.docx) for conditional clearance."
        )
        sample_pdf = os.path.join(config.DEMO_DIR, "sample_inspection_report.pdf")
        return agent_engine.run_agent(prompt, files=[sample_pdf])

    def run_coding_agent_demo(self) -> Dict[str, Any]:
        prompt = (
            "Write a Python telemetry validation program that checks plant pressure readings against "
            "the 45 bar threshold and test it inside the restricted code execution sandbox."
        )
        return agent_engine.run_agent(prompt)

    def run_multimodal_vision_demo(self) -> Dict[str, Any]:
        prompt = (
            "Perform multimodal vision diagnostics on this engineering drawing image (sample_engineering_image.png), "
            "extract key components, and report any visual defects or surface corrosion."
        )
        sample_img = os.path.join(config.DEMO_DIR, "sample_engineering_image.png")
        return agent_engine.run_agent(prompt, files=[sample_img])

demo_runner = FlagshipDemoRunner()
