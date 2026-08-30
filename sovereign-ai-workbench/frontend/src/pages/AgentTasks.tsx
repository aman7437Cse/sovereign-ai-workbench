import React from 'react';

export const AgentTasks: React.FC = () => {
  const sampleTasks = [
    {
      id: 'TASK-D7E870B8',
      type: 'DOCUMENT',
      model: 'Sovereign Deep Reasoner',
      prompt: 'Analyze inspection report and prepare approval note for Refinery Unit 07',
      status: 'COMPLETED',
      duration: '0.04s',
      tools: ['file_ocr', 'knowledge_search', 'generate_docx'],
      deliverable: 'Approval_Note_TASK-D7E870B8.docx'
    },
    {
      id: 'TASK-C419A901',
      type: 'CODING',
      model: 'Sovereign Code Architect',
      prompt: 'Write Python program to test telemetry pressure readings against 45 bar threshold',
      status: 'COMPLETED',
      duration: '0.02s',
      tools: ['code_sandbox'],
      deliverable: 'Verified Code Execution Log'
    },
    {
      id: 'TASK-V881B203',
      type: 'VISION',
      model: 'Sovereign Vision Model',
      prompt: 'Perform visual diagnostics on Valve V-102 schematic diagram',
      status: 'COMPLETED',
      duration: '0.03s',
      tools: ['vision_analysis'],
      deliverable: 'Defect Bounding Box Annotation'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="enterprise-card">
        <div className="card-title">
          <span>Active & Historical Agentic Task Execution Trees</span>
          <span className="badge badge-success">3 COMPLETED TASKS</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Type</th>
              <th>Routed Model</th>
              <th>Prompt Description</th>
              <th>Tools Invoked</th>
              <th>Status</th>
              <th>Deliverable Output</th>
            </tr>
          </thead>
          <tbody>
            {sampleTasks.map((t) => (
              <tr key={t.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#38bdf8' }}>{t.id}</td>
                <td><span className="badge badge-cyan">{t.type}</span></td>
                <td>{t.model}</td>
                <td style={{ maxWidth: '300px' }}>{t.prompt}</td>
                <td>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {t.tools.map((tl, i) => (
                      <span key={i} style={{ fontSize: '0.72rem', background: '#0f172a', padding: '2px 6px', borderRadius: '4px', border: '1px solid #334155' }}>
                        {tl}
                      </span>
                    ))}
                  </div>
                </td>
                <td><span className="badge badge-success">✓ {t.status}</span></td>
                <td style={{ color: '#10b981', fontWeight: 500 }}>{t.deliverable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
