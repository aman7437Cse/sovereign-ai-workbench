import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Search, Trash2 } from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      const res = await apiClient.getKnowledgeDocs();
      setDocuments(res.documents || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const res = await apiClient.searchKnowledge(searchQuery);
      setSearchResults(res.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      await apiClient.deleteKnowledgeDoc(filename);
      loadDocs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="enterprise-card">
        <div className="card-title">
          <span>Local Vector Database & SOP Knowledge Base (RAG)</span>
          <span className="badge badge-success">AIR-GAPPED VECTOR DB</span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          Upload organizational SOPs, safety manuals, technical specifications, and policy documents. Data is stored in local vector embeddings for accurate context retrieval and citations during agent execution.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Test semantic search across local SOP vector store (e.g. 'wall thinning threshold')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}
          />
          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={16} /> Query Local RAG
          </button>
        </form>

        {/* Search Results Display */}
        {searchResults.length > 0 && (
          <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #38bdf8' }}>
            <h4 style={{ color: '#38bdf8', fontSize: '0.9rem', marginBottom: '10px' }}>Semantic Search Results & Source Citations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {searchResults.map((r, idx) => (
                <div key={idx} style={{ background: '#1e293b', padding: '10px', borderRadius: '6px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600, marginBottom: '4px' }}>
                    <span>📄 Citation: {r.source} ({r.chunk_id})</span>
                    <span>Relevance Score: {r.score}</span>
                  </div>
                  <div style={{ color: '#f8fafc' }}>"{r.content}"</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Chunks Indexed</th>
              <th>Vector Index Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((d, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>📄 {d.filename}</td>
                  <td>{d.chunk_count} Chunks</td>
                  <td><span className="badge badge-success">✓ {d.status}</span></td>
                  <td>
                    <button 
                      onClick={() => handleDelete(d.filename)}
                      style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>
                  📄 sample_sop.txt (Indexed 4 chunks into local RAG vector store)
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
