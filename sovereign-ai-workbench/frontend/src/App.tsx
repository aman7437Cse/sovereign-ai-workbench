import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Workbench } from './pages/Workbench';
import { AgentTasks } from './pages/AgentTasks';
import { DocumentIntel } from './pages/DocumentIntel';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { CodingAgent } from './pages/CodingAgent';
import { Multimodal } from './pages/Multimodal';
import { Deliverables } from './pages/Deliverables';
import { ModelCenter } from './pages/ModelCenter';
import { SecurityCenter } from './pages/SecurityCenter';
import { AuditLogs } from './pages/AuditLogs';
import { SystemHealth } from './pages/SystemHealth';
import { Settings } from './pages/Settings';
import { apiClient } from './api/client';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [demoTaskResult, setDemoTaskResult] = useState<any>(null);

  const handleRunDemo = async (type: 'inspection' | 'coding' | 'vision') => {
    setActiveTab('workbench');
    try {
      let res;
      if (type === 'inspection') {
        res = await apiClient.runDemoInspectionApproval();
      } else if (type === 'coding') {
        res = await apiClient.runDemoCodingAgent();
      } else {
        res = await apiClient.runDemoMultimodalVision();
      }
      setDemoTaskResult(res);
    } catch (err) {
      console.error('Demo run error', err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-wrapper">
        <Header activeTab={activeTab} onRunDemo={handleRunDemo} />
        <main className="content-area">
          {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} onRunDemo={handleRunDemo} />}
          {activeTab === 'workbench' && <Workbench demoTaskResult={demoTaskResult} />}
          {activeTab === 'agent-tasks' && <AgentTasks />}
          {activeTab === 'document-intel' && <DocumentIntel />}
          {activeTab === 'knowledge-base' && <KnowledgeBase />}
          {activeTab === 'coding-agent' && <CodingAgent />}
          {activeTab === 'multimodal' && <Multimodal />}
          {activeTab === 'deliverables' && <Deliverables />}
          {activeTab === 'model-center' && <ModelCenter />}
          {activeTab === 'security-center' && <SecurityCenter />}
          {activeTab === 'audit-logs' && <AuditLogs />}
          {activeTab === 'system-health' && <SystemHealth />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;
