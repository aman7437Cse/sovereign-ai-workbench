import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

export const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    apiClient.getAuditLogs(100).then(res => setLogs(res.logs || [])).catch(console.error);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="enterprise-card">
        <div className="card-title">
          <span>Structured Security & Operational Audit Log</span>
          <span className="badge badge-success">{logs.length} AUDIT EVENTS</span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          Every critical user login, model routing decision, tool execution, code sandbox run, document generation, and RAG search is recorded into a secure local audit trail. Raw confidential document contents are never logged.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Resource Target</th>
              <th>Model Used</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#38bdf8' }}>{log.id}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{log.timestamp}</td>
                <td>{log.user}</td>
                <td><span className="badge badge-cyan">{log.action}</span></td>
                <td style={{ maxWidth: '240px', wordBreak: 'break-all' }}>{log.resource}</td>
                <td>{log.model}</td>
                <td>
                  <span className={`badge ${log.status === 'SUCCESS' ? 'badge-success' : 'badge-warning'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
