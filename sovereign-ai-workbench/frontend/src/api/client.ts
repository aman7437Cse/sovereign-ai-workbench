import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const apiClient = {
  // Sovereignty & System Telemetry
  getSecurityStatus: () => axios.get(`${API_BASE}/security/status`).then(r => r.data),
  getNetworkTelemetry: () => axios.get(`${API_BASE}/security/network`).then(r => r.data),
  getAuditLogs: (limit = 100) => axios.get(`${API_BASE}/audit?limit=${limit}`).then(r => r.data),
  getSystemHealth: () => axios.get(`${API_BASE}/system/health`).then(r => r.data),

  // Model Registry & Router
  getModels: () => axios.get(`${API_BASE}/models`).then(r => r.data),
  routeTask: (prompt: string, files: string[] = []) => 
    axios.post(`${API_BASE}/models/route`, { prompt, files }).then(r => r.data),

  // Agentic Workbench
  runAgent: (prompt: string, files: string[] = []) => 
    axios.post(`${API_BASE}/agent/run`, { prompt, files }).then(r => r.data),

  // Files & Deliverables
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_BASE}/files/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(r => r.data);
  },
  getDeliverables: () => axios.get(`${API_BASE}/deliverables`).then(r => r.data),
  getDownloadUrl: (filename: string) => `${API_BASE}/files/download/${filename}`,

  // Knowledge Base & RAG
  getKnowledgeDocs: () => axios.get(`${API_BASE}/knowledge/documents`).then(r => r.data),
  searchKnowledge: (query: string, top_k = 3) => 
    axios.post(`${API_BASE}/knowledge/search`, { query, top_k }).then(r => r.data),
  deleteKnowledgeDoc: (filename: string) => 
    axios.delete(`${API_BASE}/knowledge/documents/${filename}`).then(r => r.data),

  // Code Sandbox
  executeCode: (code: string, timeout = 10) => 
    axios.post(`${API_BASE}/code/execute`, { code, timeout }).then(r => r.data),

  // 1-Click SIH Flagship Demo Endpoints
  runDemoInspectionApproval: () => axios.post(`${API_BASE}/demo/inspection_approval`).then(r => r.data),
  runDemoCodingAgent: () => axios.post(`${API_BASE}/demo/coding_agent`).then(r => r.data),
  runDemoMultimodalVision: () => axios.post(`${API_BASE}/demo/multimodal_analysis`).then(r => r.data),
};
