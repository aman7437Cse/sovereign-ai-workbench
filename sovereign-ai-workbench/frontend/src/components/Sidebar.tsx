import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  ListTodo, 
  FileSearch, 
  BookOpen, 
  Code2, 
  Eye, 
  Download, 
  Cpu, 
  ShieldCheck, 
  History, 
  Activity, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'workbench', label: 'AI Workbench', icon: Bot },
    { id: 'agent-tasks', label: 'Agent Tasks', icon: ListTodo },
    { id: 'document-intel', label: 'Document Intelligence', icon: FileSearch },
    { id: 'knowledge-base', label: 'Knowledge Base (RAG)', icon: BookOpen },
    { id: 'coding-agent', label: 'Coding Sandbox', icon: Code2 },
    { id: 'multimodal', label: 'Multimodal Vision', icon: Eye },
    { id: 'deliverables', label: 'Deliverables Hub', icon: Download },
    { id: 'model-center', label: 'Model Center & Router', icon: Cpu },
    { id: 'security-center', label: 'Security & Sovereignty', icon: ShieldCheck },
    { id: 'audit-logs', label: 'Audit Logs', icon: History },
    { id: 'system-health', label: 'System Health', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-title">
          <ShieldCheck size={22} /> SOVEREIGN AI
        </div>
        <div className="brand-subtitle">Industrial Agentic Workbench</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="air-gap-pill">
          <div className="dot-indicator" />
          <span>AIR-GAPPED MODE ACTIVE</span>
        </div>
      </div>
    </aside>
  );
};
