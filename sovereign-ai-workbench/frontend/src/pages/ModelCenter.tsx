import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

export const ModelCenter: React.FC = () => {
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    apiClient.getModels().then(res => setModels(res.models || [])).catch(console.error);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="enterprise-card">
        <div className="card-title">
          <span>Local Open-Weight Model Registry & Dynamic Auto-Router Matrix</span>
          <span className="badge badge-success">4 MODELS ONLINE</span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          The Workbench abstracts local LLM backends (Ollama, llama.cpp, vLLM, Transformers, and Local Fallback Engine) behind a unified model adapter interface. Tasks are dynamically routed based on capabilities.
        </p>

        <div className="card-grid">
          {models.map((m, idx) => (
            <div key={idx} className="enterprise-card" style={{ background: '#0f172a', border: '1px solid var(--border-highlight)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="badge badge-cyan">{m.type}</span>
                <span className="badge badge-success">● {m.status}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>{m.name}</h3>
              <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginBottom: '12px' }}>ID: {m.id}</div>
              
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><strong>Provider:</strong> {m.provider}</div>
                <div><strong>Context Window:</strong> {m.context_length}</div>
                <div><strong>GPU Requirement:</strong> {m.gpu_requirement}</div>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Capabilities</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {m.capabilities?.map((c: string, i: number) => (
                    <span key={i} style={{ fontSize: '0.72rem', background: '#1e293b', padding: '2px 6px', borderRadius: '4px', color: '#cbd5e1' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
