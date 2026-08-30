import React from 'react';
import { Eye } from 'lucide-react';

export const Multimodal: React.FC = () => {
  const detections = [
    { label: 'Pressure Safety Valve V-102', confidence: '96%', bbox: '[120, 80, 450, 380]', status: 'OPERATIONAL' },
    { label: 'Secondary Flange Assembly', confidence: '93%', bbox: '[500, 150, 720, 400]', status: 'VERIFIED' },
    { label: 'Surface Oxidation Deposit', confidence: '89%', bbox: '[280, 220, 340, 290]', status: 'MONITOR' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="enterprise-card">
        <div className="card-title">
          <span>Multimodal Vision Diagnostics & Engineering Drawings</span>
          <span className="badge badge-cyan">AIR-GAPPED VISION ENGINE</span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          Upload high-resolution photographs, scanned blueprints, or schematics. The multimodal vision model tags technical components and flags visual anomalies.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Engineering Canvas Mock / Drawing view */}
          <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', position: 'relative' }}>
            <div style={{ border: '2px dashed #38bdf8', padding: '40px', borderRadius: '8px', textAlign: 'center', color: '#94a3b8' }}>
              <Eye size={48} color="#38bdf8" style={{ marginBottom: '12px' }} />
              <div><strong>sample_engineering_image.png</strong></div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Refinery Unit-07 Pressure Valve V-102 Schematic</div>
              <div style={{ marginTop: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem' }}>
                3 Visual Annotations Bounded
              </div>
            </div>
          </div>

          {/* Detections & AI Interpretation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '0.9rem', marginBottom: '12px' }}>Detected Bounding Boxes & Confidence Metrics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {detections.map((d, idx) => (
                  <div key={idx} style={{ background: '#1e293b', padding: '10px', borderRadius: '6px', fontSize: '0.84rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#f8fafc' }}>{d.label}</strong>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Bounding Box: {d.bbox}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-success">{d.confidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '6px' }}>AI Technical Diagnostic Summary</h4>
              <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                Visual inspection verifies structural bolt torque alignment on Valve V-102. Minor surface oxidation on lower flange assembly is consistent with humidity exposure. Zero active micro-cracks or pressure line fractures detected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
