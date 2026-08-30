# SOVEREIGN AI WORKBENCH — TECHNICAL ARCHITECTURE

## System Overview
The **Sovereign AI Workbench** is designed for high-security industrial organizations (refineries, PSU plants, defense manufacturers, government agencies) that require agentic AI intelligence on confidential documents without sending data across external networks.

```
+-----------------------------------------------------------------------------------+
|                                 REACT FRONTEND                                    |
|   Dashboard | Workbench | Agent Tasks | Document Intel | RAG KB | Security Center |
+-----------------------------------------------------------------------------------+
                                         |
                                    REST APIs
                                         v
+-----------------------------------------------------------------------------------+
|                                FASTAPI BACKEND                                    |
|  +---------------------+   +---------------------+   +-------------------------+  |
|  | Model Auto-Router   |   | Multi-Step Agent    |   | Security Network Monitor|  |
|  | Task Classifier     |   | Execution Loop      |   | Socket Telemetry Logger |  |
|  +---------------------+   +---------------------+   +-------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
            +----------------------------+----------------------------+
            |                            |                            |
            v                            v                            v
+-----------------------+    +-----------------------+    +-----------------------+
|  LOCAL MODEL ADAPTERS |    |   SAFE TOOL REGISTRY  |    | LOCAL RAG VECTOR DB   |
| - Local Fallback Engine|    | - Local OCR Engine    |    | - Document Chunker    |
| - Ollama / llama.cpp  |    | - Multimodal Vision   |    | - In-Memory Vector DB |
| - Transformers / vLLM |    | - Code Sandbox (10s)  |    | - SOP Citation Index  |
|                       |    | - DOCX/PPTX/XLSX Gen  |    |                       |
+-----------------------+    +-----------------------+    +-----------------------+
```

---

## Core Components

### 1. Model Abstraction & Dynamic Auto-Router (`backend/models/`)
- Unified `ModelAdapter` base class supporting Ollama, llama.cpp, vLLM, and local fallback engines.
- `ModelRouter` classifies incoming user requests into `DOCUMENT`, `CODING`, `VISION`, `SPREADSHEET`, or `GENERAL` task categories and assigns specialized model profiles.

### 2. Autonomous Multi-Step Agent Loop (`backend/agent/`)
Executes an explicit agent loop:
`Task Received → Classify → Route Model → Plan Steps → Select Tools → Execute → Observe → Verify → Generate Deliverables → Completed`.

### 3. Safe Tool Registry (`backend/tools/`)
Approved tool schema directory enforcing permissions:
- `READ_ONLY`: OCR, Vision, RAG search, Calculator
- `RESTRICTED_SANDBOX`: Python Code Sandbox
- `FILE_GENERATION`: `.docx` (Approval Notes), `.pptx` (Decks), `.xlsx` (Data Sheets)

### 4. Local RAG & Vector Search (`backend/rag/`)
Extracts text from PDF/DOCX/TXT files, splits into overlapping 500-character chunks, and indexes embeddings locally using TF-IDF + Cosine Similarity for offline semantic retrieval and SOP citations.

### 5. Restricted Code Execution Sandbox (`backend/sandbox/`)
Runs AI-generated Python code in an isolated subprocess with strict 10-second timeouts, capturing `stdout` and `stderr` safely.

### 6. Security Center & Network Telemetry (`backend/security/`)
Monitors application outbound connection attempts, recording zero external API calls and zero exfiltrated megabytes to prove air-gapped compliance.
