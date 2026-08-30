import React from 'react';

export const DocumentIntel: React.FC = () => {
  const extractedText = (
    "[OCR Scanned Page 1]\n" +
    "REFINERY INSPECTION SHEET - UNIT 07\n" +
    "Equipment ID: Loop-4B / Valve V-102\n" +
    "Inspection Date: 2025-08-20\n" +
    "Ultrasonic Wall Thickness: 8.76 mm (Baseline: 10.0 mm)\n" +
    "Wall Thinning Rate: 12.4% (Threshold: 15.0% Emergency / 10.0% Scheduled Maintenance)\n" +
    "Operating Pressure: 41.8 bar | Max Allowable: 45.0 bar\n" +
    "Inspector Signature: J. Miller, Chief Mechanical Inspector"
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="enterprise-card">
        <div className="card-title">
          <span>Local OCR & Scanned Document Layout Intelligence</span>
          <span className="badge badge-success">AIR-GAPPED OCR ACTIVE</span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          Upload scanned inspection reports, equipment logs, or PDF documents. The local OCR engine extracts layout text layer natively without sending images to third-party web APIs.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Document Layout Inspector */}
          <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ color: '#38bdf8', fontSize: '0.9rem', marginBottom: '10px' }}>Document Metadata & Structure</h4>
            <div style={{ fontSize: '0.84rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Document Name:</strong> sample_inspection_report.pdf</div>
              <div><strong>Format:</strong> Scanned PDF / Image Layer</div>
              <div><strong>Page Count:</strong> 1 Page</div>
              <div><strong>Detected Entities:</strong> Equipment ID Loop-4B, Valve V-102, 8.76mm Wall Thickness</div>
              <div><strong>Language:</strong> English Industrial Technical</div>
            </div>
          </div>

          {/* Extracted Text View */}
          <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '10px' }}>Extracted OCR Text Output</h4>
            <textarea
              readOnly
              style={{ width: '100%', height: '180px', background: '#020617', border: '1px solid #1e293b', color: '#38bdf8', padding: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', borderRadius: '6px' }}
              value={extractedText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
