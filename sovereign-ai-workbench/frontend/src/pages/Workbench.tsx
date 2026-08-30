import React, { useState } from 'react';
import { apiClient } from '../api/client';
import { Send, Paperclip, Cpu, Download, FileText, Sparkles, Layers } from 'lucide-react';

interface WorkbenchProps {
  demoTaskResult?: any;
}

export const Workbench: React.FC<WorkbenchProps> = ({ demoTaskResult }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: 'Welcome to **SOVEREIGN AI WORKBENCH**. Enter a task (e.g. *"Analyze inspection report and prepare approval note"*, *"Write Python code to validate pressure data"*, or *"Analyze engineering drawing"*) to trigger autonomous multi-step agent execution.',
      result: demoTaskResult
    }
  ]);
  const [currentTask, setCurrentTask] = useState<any>(demoTaskResult || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !selectedFile) return;

    const userMsg = prompt;
    setPrompt('');
    setLoading(true);

    let filePaths: string[] = [];
    if (selectedFile) {
      try {
        const uploadRes = await apiClient.uploadFile(selectedFile);
        filePaths.push(uploadRes.path);
        setSelectedFile(null);
      } catch (err) {
        console.error(err);
      }
    }

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    try {
      const res = await apiClient.runAgent(userMsg, filePaths);
      setCurrentTask(res);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.response,
        result: res
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error running agentic task. Please verify backend service.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workbench-grid">
      {/* Left Chat Workspace */}
      <div className="chat-panel">
        <div className="chat-messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`message-bubble ${m.role}`}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>

              {m.result?.deliverable && (
                <div style={{ marginTop: '14px', padding: '12px', background: '#1e293b', borderRadius: '8px', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={20} color="#38bdf8" />
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#f8fafc' }}>{m.result.deliverable.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Generated Industrial Deliverable</div>
                    </div>
                  </div>
                  <a 
                    href={apiClient.getDownloadUrl(m.result.deliverable.name)} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ background: '#38bdf8', color: '#0f172a', padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Download size={14} /> Download
                  </a>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="message-bubble assistant">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                <Sparkles size={16} className="animate-spin" /> Autonomous Agent Executing Multi-Step Plan...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="chat-input-area">
          {selectedFile && (
            <div style={{ fontSize: '0.8rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Paperclip size={14} /> Attached File: {selectedFile.name}
            </div>
          )}
          <textarea
            className="chat-textarea"
            placeholder="Enter natural language task (e.g. 'Analyze inspection report and prepare approval note')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="chat-controls">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#94a3b8', fontSize: '0.84rem' }}>
              <Paperclip size={16} /> Attach File (PDF / PNG / XLSX)
              <input 
                type="file" 
                style={{ display: 'none' }} 
                onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
              />
            </label>
            <button type="submit" className="btn-primary" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Send size={15} /> Execute Task
            </button>
          </div>
        </form>
      </div>

      {/* Right Inspector Panel */}
      <div className="inspector-panel">
        {/* Model Router Panel */}
        <div className="enterprise-card">
          <div className="card-title">
            <span>Model Auto-Router</span>
            <Cpu size={16} color="#38bdf8" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase' }}>Detected Task Type</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>
              {currentTask?.task_type || 'DOCUMENT'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', marginTop: '6px' }}>Selected Local Model</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc' }}>
              {currentTask?.selected_model || 'Sovereign Deep Reasoner'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', marginTop: '4px' }}>
              {currentTask?.routing_reason || 'Document intelligence & layout matching.'}
            </div>
          </div>
        </div>

        {/* Agent Step Activity Timeline */}
        <div className="enterprise-card">
          <div className="card-title">
            <span>Agent Execution Timeline</span>
            <Layers size={16} color="#10b981" />
          </div>
          <div className="timeline-list">
            {(currentTask?.timeline || [
              { step: 'Task Classification', status: 'COMPLETED', detail: 'Task classified as DOCUMENT' },
              { step: 'Model Auto-Selection', status: 'COMPLETED', detail: 'Routed to Sovereign Deep Reasoner' },
              { step: 'File Reader & OCR', status: 'COMPLETED', detail: 'Extracted text layer' },
              { step: 'Local Knowledge Search', status: 'COMPLETED', detail: 'SOP compliance verified' },
              { step: 'Approval Note Generated', status: 'COMPLETED', detail: 'Word doc created' }
            ]).map((t: any, idx: number) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-step-icon">✓</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{t.step}</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sources & Citations */}
        <div className="enterprise-card">
          <div className="card-title">
            <span>Local KB Citations</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            {currentTask?.sources_used?.length ? (
              currentTask.sources_used.map((s: string, idx: number) => (
                <div key={idx} style={{ padding: '6px', background: '#0f172a', borderRadius: '4px', marginBottom: '4px', borderLeft: '3px solid #10b981' }}>
                  📄 {s}
                </div>
              ))
            ) : (
              <div style={{ fontStyle: 'italic' }}>SOP_Inspection_Clearance_2025.pdf</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
