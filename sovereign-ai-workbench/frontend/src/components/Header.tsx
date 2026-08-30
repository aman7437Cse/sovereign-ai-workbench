import React from 'react';
import { Play, Lock } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onRunDemo: (type: 'inspection' | 'coding' | 'vision') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onRunDemo }) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Executive Command Dashboard';
      case 'workbench': return 'AI Agentic Workbench Workspace';
      case 'agent-tasks': return 'Autonomous Agent Execution Logs';
      case 'document-intel': return 'Document Layout & OCR Intelligence';
      case 'knowledge-base': return 'Air-Gapped Vector Knowledge Base';
      case 'coding-agent': return 'Isolated Code Execution Sandbox';
      case 'multimodal': return 'Multimodal Vision & Drawing Diagnostics';
      case 'deliverables': return 'Generated Deliverables Hub';
      case 'model-center': return 'Model Registry & Dynamic Auto-Router';
      case 'security-center': return 'Security & Air-Gapped Sovereignty Center';
      case 'audit-logs': return 'Structured System Audit Trail';
      case 'system-health': return 'Hardware & Service Health Monitor';
      case 'settings': return 'Workbench Configuration & Air-Gap Policy';
      default: return 'Sovereign AI Workbench';
    }
  };

  return (
    <header className="header">
      <div className="page-title-area">
        <h2>{getTabTitle(activeTab)}</h2>
      </div>

      <div className="header-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <Lock size={14} color="#10b981" />
          <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>0 Cloud Calls | 0 MB Sent</span>
        </div>

        <button className="btn-demo-launcher" onClick={() => onRunDemo('inspection')}>
          <Play size={15} /> Run Flagship SIH Demo
        </button>
      </div>
    </header>
  );
};
