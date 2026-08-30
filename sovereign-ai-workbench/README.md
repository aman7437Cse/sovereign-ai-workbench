# SOVEREIGN AI WORKBENCH
### Private Agentic Intelligence for Confidential Industrial Work

[![Air-Gapped Status](https://img.shields.io/badge/Air--Gapped-100%25%20Verified-emerald?style=for-the-badge)](file:///Users/amangupta7437/Documents/gpt/sovereign-ai-workbench)
[![SIH Final Round](https://img.shields.io/badge/SIH%20Final-Industrial%20Grade-blue?style=for-the-badge)](file:///Users/amangupta7437/Documents/gpt/sovereign-ai-workbench)

The **Sovereign AI Workbench** is an air-gapped, privacy-first, self-hosted agentic AI platform built for confidential industrial environments (refineries, PSU operations, defense manufacturing, and government departments).

It delivers a Claude/Codex-style multi-step agentic experience while guaranteeing that zero organizational data leaves local infrastructure.

---

## 🌟 Key Product Features

1. **Air-Gapped Core & Model Abstraction Layer:** Runs 100% offline out-of-the-box using local open-weight model adapters (Ollama, llama.cpp, vLLM, Transformers) with built-in standalone fallback inference.
2. **Dynamic Task Classifier & Model Auto-Router:** Automatically categorizes user tasks (`DOCUMENT`, `CODING`, `VISION`, `SPREADSHEET`, `GENERAL`) and routes them to specialized local model capabilities with visible UI execution telemetry.
3. **Multi-Step Agentic Engine:** Autonomous step-by-step execution loop (`Plan → Select Tools → Execute → Observe → Verify → Replan → Deliverable`).
4. **Approved Tool Registry:** Safe tools for Local OCR, Engineering Drawing Diagnostics, Vector RAG Search, Code Sandbox Execution, Word/PPT/Excel Generation, and Calculation.
5. **Local Multimodal & Document Intelligence:** Native support for PDFs, scanned inspection sheets, and engineering drawings without external web APIs.
6. **Local Knowledge Base (RAG):** In-memory / local semantic chunking and search over SOP policies with inline citations.
7. **Restricted Code Execution Sandbox:** Isolated temporary Python execution environment with timeout limits, stdout/stderr capture, error detection, and auto-repair.
8. **Real Industrial Deliverable Generators:** Real `.docx` (Approval Notes), `.pptx` (Management Decks), `.xlsx` (Data Sheets), and `.txt` files generated via `python-docx`, `python-pptx`, and `openpyxl`.
9. **Security & Sovereignty Center:** Active backend network monitoring proving 0 external API calls and 0 MB exfiltration, along with structured audit logs.
10. **Enterprise Command Center UI:** 13 React pages covering Dashboard, Workbench, Agent Tasks, Document Intel, Knowledge Base, Coding Sandbox, Multimodal Vision, Deliverables, Model Center, Security, Audit Logs, System Health, and Settings.

---

## 🛠️ Quick Start Instructions

### Prerequisites
- Python 3.10+
- Node.js v18+ & npm

### 1. Launch Backend Server
```bash
cd sovereign-ai-workbench/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
PYTHONPATH=. python main.py
```
*Backend runs on `http://127.0.0.1:8000`*

### 2. Launch Frontend Dev Server
```bash
cd sovereign-ai-workbench/frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🎯 1-Click SIH Flagship Demonstrations

In the frontend UI, click **Run Flagship SIH Demo** in the top header or navigate to the **Dashboard** to run:

1. **Demo 1 (Inspection Report → Approval Note):**  
   Scanned Inspection PDF → Local OCR → SOP Vector RAG Search → Compliance Verification → Word (`.docx`) Approval Note Generation.
2. **Demo 2 (Coding Agent):**  
   Telemetry Script Prompt → Python Code Generation → Isolated Sandbox Execution → Live Terminal Console Output.
3. **Demo 3 (Multimodal Vision):**  
   Engineering Drawing Upload → Object Bounding Boxes → Visual Defect & Flange Alignment Analysis.
4. **Demo 4 (Sovereignty Proof):**  
   Security Center Telemetry showing `Air-Gapped: ON`, `External Calls: 0`, `Data Exfiltrated: 0 MB`.

---

## 📁 Repository Structure
```
sovereign-ai-workbench/
├── backend/
│   ├── main.py                     # FastAPI application & REST endpoints
│   ├── config.py                   # Air-gapped & app configuration
│   ├── models/                     # Model adapters & auto-router
│   ├── agent/                      # Multi-step agent execution engine
│   ├── tools/                      # OCR, Vision, RAG, Sandbox, DOCX tools
│   ├── rag/                        # Vector store & document chunker
│   ├── sandbox/                    # Restricted process execution sandbox
│   ├── security/                   # Network monitor & audit logger
│   ├── demo/                       # 1-click SIH demo scenarios & sample files
│   └── tests/                      # Pytest automated test suite
├── frontend/
│   ├── src/
│   │   ├── components/             # Sidebar, Header, UI cards
│   │   ├── pages/                  # 13 enterprise command center pages
│   │   ├── api/client.ts           # Axios backend API bindings
│   │   └── App.tsx                 # Main layout & router
└── docs/
    ├── SIH_DEMO_SCRIPT.md          # Evaluator demonstration guide
    └── ARCHITECTURE.md             # Detailed technical architecture
```
