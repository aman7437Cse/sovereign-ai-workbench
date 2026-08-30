import React, { useState } from 'react';

export const Settings: React.FC = () => {
  const [airGapped, setAirGapped] = useState(true);
  const [sandboxTimeout, setSandboxTimeout] = useState(10);
  const [ollamaUrl, setOllamaUrl] = useState('http://127.0.0.1:11434');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="enterprise-card">
        <div className="card-title">
          <span>Workbench Policy & System Configuration</span>
          <span className="badge badge-success">AIR-GAPPED POLICY ENFORCED</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {/* Air-gapped toggle */}
          <div style={{ padding: '16px', background: '#0f172a', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ color: '#f8fafc' }}>Enforce Strict Air-Gapped Mode</strong>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Disables all cloud endpoints, external telemetry, and third-party APIs</div>
            </div>
            <input 
              type="checkbox" 
              checked={airGapped} 
              onChange={(e) => setAirGapped(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>

          {/* Sandbox timeout limit */}
          <div style={{ padding: '16px', background: '#0f172a', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ color: '#f8fafc' }}>Code Sandbox Execution Timeout (seconds)</strong>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Maximum duration allowed before python process termination</div>
            </div>
            <input 
              type="number" 
              value={sandboxTimeout} 
              onChange={(e) => setSandboxTimeout(Number(e.target.value))}
              style={{ width: '80px', padding: '6px', background: '#1e293b', border: '1px solid #334155', borderRadius: '4px', color: 'white' }}
            />
          </div>

          {/* Ollama endpoint URL */}
          <div style={{ padding: '16px', background: '#0f172a', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ color: '#f8fafc' }}>Local Ollama / llama.cpp HTTP Endpoint</strong>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Localhost URL for optional local GPU model inference</div>
            </div>
            <input 
              type="text" 
              value={ollamaUrl} 
              onChange={(e) => setOllamaUrl(e.target.value)}
              style={{ width: '240px', padding: '6px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '4px', color: 'white', fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
