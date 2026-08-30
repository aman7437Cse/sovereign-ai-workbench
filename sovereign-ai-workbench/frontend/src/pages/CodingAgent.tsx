import React, { useState } from 'react';
import { apiClient } from '../api/client';
import { Play, Terminal } from 'lucide-react';

export const CodingAgent: React.FC = () => {
  const [code, setCode] = useState<string>(
    "# Sovereign AI Code Sandbox - Plant Telemetry Inspector\n" +
    "import json\n\n" +
    "def validate_pressure_telemetry(readings):\n" +
    "    results = []\n" +
    "    for item in readings:\n" +
    "        p = item.get('pressure_bar', 0)\n" +
    "        status = 'NORMAL' if p <= 45.0 else 'CRITICAL_HIGH'\n" +
    "        results.append({'asset': item['asset'], 'pressure': p, 'status': status})\n" +
    "    return results\n\n" +
    "data = [\n" +
    "    {'asset': 'Loop 4B', 'pressure_bar': 41.8},\n" +
    "    {'asset': 'Valve V-102', 'pressure_bar': 46.2}\n" +
    "]\n\n" +
    "output = validate_pressure_telemetry(data)\n" +
    "print(json.dumps(output, indent=2))\n"
  );
  const [execResult, setExecResult] = useState<any>(null);
  const [executing, setExecuting] = useState(false);

  const handleRunCode = async () => {
    setExecuting(true);
    try {
      const res = await apiClient.executeCode(code);
      setExecResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="enterprise-card">
        <div className="card-title">
          <span>Isolated Code Execution Sandbox</span>
          <span className="badge badge-success">RESTRICTED SUBPROCESS ACTIVE</span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          Generated Python scripts are executed in a restricted temporary sandbox environment with strict resource limits, time bounds (10s limit), stdout/stderr capture, and zero host filesystem access.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Code Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#38bdf8' }}>Python Code Script</span>
              <button onClick={handleRunCode} disabled={executing} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Play size={14} /> Run in Sandbox
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ width: '100%', height: '280px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#f8fafc', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.86rem', borderRadius: '8px', outline: 'none' }}
            />
          </div>

          {/* Terminal Sandbox Console Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={16} /> Sandbox Terminal Console (stdout & stderr)
            </span>
            <div className="terminal-box" style={{ height: '280px', overflowY: 'auto' }}>
              {executing ? (
                <div style={{ color: '#eab308' }}>Executing Python script inside isolated sandbox...</div>
              ) : execResult ? (
                <div>
                  <div style={{ color: '#10b981', marginBottom: '8px' }}>
                    [STATUS: {execResult.success ? 'SUCCESS (Exit Code 0)' : 'FAILURE'}] | Execution Time: {execResult.duration_sec}s
                  </div>
                  {execResult.stdout && (
                    <pre style={{ color: '#38bdf8', whiteSpace: 'pre-wrap' }}>{execResult.stdout}</pre>
                  )}
                  {execResult.stderr && (
                    <pre style={{ color: '#f43f5e', whiteSpace: 'pre-wrap' }}>{execResult.stderr}</pre>
                  )}
                </div>
              ) : (
                <div style={{ color: '#64748b' }}>
                  Click "Run in Sandbox" to execute script and capture terminal output...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
