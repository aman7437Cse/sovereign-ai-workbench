# SIH FINAL EVALUATION DEMONSTRATION SCRIPT

**Product Title:** SOVEREIGN AI WORKBENCH  
**Subtitle:** Private Agentic Intelligence for Confidential Industrial Work  
**Target Domain:** Refineries, PSU Operations, Defense Manufacturing, Government Agencies  

---

## PRESENTATION OVERVIEW FOR EVALUATORS (1-MINUTE ELEVATOR PITCH)

> *"Respected Evaluators, confidential industrial facilities cannot upload sensitive inspection reports, plant schematics, or equipment code to public cloud APIs like OpenAI or Claude. 
> 
> We have built the **SOVEREIGN AI WORKBENCH** — a self-hosted, air-gapped, privacy-first AI platform running locally on open-weight models. It combines dynamic model routing, multi-step agent execution, local OCR, vector RAG, a restricted code execution sandbox, and real Microsoft Word/PowerPoint/Excel document generation while actively proving zero external data exfiltration."*

---

## SCENARIO A — DOCUMENT AGENT DEMO (Inspection Report → Approval Note)

### Objective
Demonstrate autonomous processing of a scanned industrial inspection report, local SOP cross-checking, and real `.docx` approval note generation.

### Execution Steps
1. Navigate to the **AI Workbench** tab (or click **Run Flagship SIH Demo** in the top header).
2. Enter the prompt:  
   `"Analyze this inspection report for Refinery Unit-07 and generate a formal approval note based on our local SOP policy."`
3. Click **Execute Task**.

### What to Point Out to Evaluators
- **Task Auto-Router Badge:** Shows `Detected Task: DOCUMENT | Routed Model: Sovereign Deep Reasoner`.
- **Agent Step Timeline:**
  - `✓ Task Classified`
  - `✓ Model Selected`
  - `✓ Local OCR Completed` (Extracts 12.4% wall thinning rate on Pipeline Loop 4B and 41.8 bar pressure on Valve V-102)
  - `✓ SOP Vector Search Completed` (Retrieves `SOP_Inspection_Clearance_2025.pdf` Section 4.2: Wall thinning limit <= 15.0% allows conditional operational clearance)
  - `✓ Approval Note Generated (.docx)`
- **Deliverable Download:** Click **Download Approval_Note_TASK-XXXX.docx**. Open the document in Word to show formatted tables, technical findings, SOP citations, and signature blocks.

---

## SCENARIO B — CODING AGENT DEMO (Code Gen → Sandbox → Verification)

### Objective
Demonstrate restricted safe code sandbox execution without host OS privilege risk.

### Execution Steps
1. Navigate to the **Coding Sandbox** tab.
2. Observe the Python script for validating plant telemetry pressure readings against the 45 bar safety limit.
3. Click **Run in Sandbox**.

### What to Point Out to Evaluators
- Code runs inside an isolated subprocess with a 10-second timeout limit.
- **Terminal Console Output:** Shows live `stdout` output (`JSON status: SUCCESS`, telemetry alerts) captured from the sandbox.
- Highlight that if syntax errors occur, the agent loops autonomously to fix errors before returning verified output.

---

## SCENARIO C — MULTIMODAL VISION DEMO (Engineering Image Diagnostics)

### Objective
Demonstrate visual feature extraction and anomaly detection on technical drawings.

### Execution Steps
1. Navigate to the **Multimodal Vision** tab.
2. Inspect the engineering drawing diagram (`sample_engineering_image.png` — Refinery Unit-07 Valve V-102).

### What to Point Out to Evaluators
- **Bounding Boxes & Confidence Tags:**
  - `Pressure Safety Valve V-102 (96% Confidence)`
  - `Secondary Flange Assembly (93% Confidence)`
  - `Surface Oxidation Deposit (89% Confidence)`
- **AI Technical Summary:** Explains bolt alignment, surface oxidation, and routine maintenance recommendations.

---

## SCENARIO D — SOVEREIGNTY PROOF (Zero Outbound Leaks & Network Telemetry)

### Objective
Provide visual and verifiable proof that zero data leaves the organization infrastructure.

### Execution Steps
1. Navigate to the **Security & Sovereignty Center** tab.

### What to Point Out to Evaluators
- **Air-Gapped Sovereignty Score:** `100% AIR-GAPPED ACTIVE`.
- **Telemetry Counters:**
  - `External API Calls: 0`
  - `Data Exfiltrated: 0 MB`
  - `Cloud Dependencies: 0`
- **Live Connection Log Table:** Show real-time socket connections logging `127.0.0.1:8000` as `ALLOWED (LOCAL)` and blocking any external destination.
