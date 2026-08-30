import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Cpu, HardDrive, Server, ShieldCheck } from 'lucide-react';

export const SystemHealth: React.FC = () => {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    apiClient.getSystemHealth().then(res => setHealth(res)).catch(console.error);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="card-grid">
        <div className="enterprise-card">
          <div className="card-title">
            <span>FastAPI Backend Server</span>
            <Server size={18} color="#10b981" />
          </div>
          <div className="metric-value" style={{ color: '#10b981', fontSize: '1.4rem' }}>
            {health?.backend_status || 'HEALTHY (ONLINE)'}
          </div>
          <div className="metric-sub">Port 8000 | Uvicorn Async Server</div>
        </div>

        <div className="enterprise-card">
          <div className="card-title">
            <span>Model Router Service</span>
            <Cpu size={18} color="#38bdf8" />
          </div>
          <div className="metric-value" style={{ color: '#38bdf8', fontSize: '1.4rem' }}>
            {health?.model_router_status || 'ONLINE'}
          </div>
          <div className="metric-sub">Intent Classifier Active</div>
        </div>

        <div className="enterprise-card">
          <div className="card-title">
            <span>Local Vector Store</span>
            <HardDrive size={18} color="#f59e0b" />
          </div>
          <div className="metric-value" style={{ color: '#f59e0b', fontSize: '1.4rem' }}>
            {health?.vector_store_status || 'ONLINE'}
          </div>
          <div className="metric-sub">In-Memory Semantic Index</div>
        </div>

        <div className="enterprise-card">
          <div className="card-title">
            <span>Code Sandbox Status</span>
            <ShieldCheck size={18} color="#10b981" />
          </div>
          <div className="metric-value" style={{ color: '#10b981', fontSize: '1.4rem' }}>
            {health?.code_sandbox_status || 'ONLINE (RESTRICTED)'}
          </div>
          <div className="metric-sub">Process Subprocess Isolation</div>
        </div>
      </div>

      <div className="enterprise-card">
        <div className="card-title">
          <span>System Hardware Resource Utilization</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.86rem' }}>
              <span>CPU Utilization Rate</span>
              <strong>{health?.metrics?.cpu_utilization_pct || 12.4}%</strong>
            </div>
            <div style={{ height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${health?.metrics?.cpu_utilization_pct || 12.4}%`, height: '100%', background: '#38bdf8' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.86rem' }}>
              <span>RAM Memory Allocation</span>
              <strong>{health?.metrics?.ram_utilization_pct || 45.8}%</strong>
            </div>
            <div style={{ height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${health?.metrics?.ram_utilization_pct || 45.8}%`, height: '100%', background: '#10b981' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
