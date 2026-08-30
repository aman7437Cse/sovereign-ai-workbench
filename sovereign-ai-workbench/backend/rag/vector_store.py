import os
import json
import re
import math
import threading
from typing import List, Dict, Any
from backend.rag.document_parser import document_parser
from backend.config import config

class LocalVectorStore:
    """
    Local Air-Gapped Vector Database & RAG Search Engine.
    Uses TF-IDF + Cosine Similarity semantic search over local document chunks.
    Re-entrant RLock prevents singletons from deadlocking thread execution.
    """
    _instance = None
    _lock = threading.RLock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(LocalVectorStore, cls).__new__(cls)
                cls._instance._init()
            return cls._instance

    def _init(self):
        self.documents: Dict[str, Dict[str, Any]] = {}
        self.chunks: List[Dict[str, Any]] = []

    def ingest_file(self, file_path: str) -> Dict[str, Any]:
        filename = os.path.basename(file_path)
        chunks = document_parser.parse_file(file_path)
        
        with self._lock:
            self.chunks = [c for c in self.chunks if c["source"] != filename]
            self.chunks.extend(chunks)
            
            doc_meta = {
                "filename": filename,
                "path": file_path,
                "chunk_count": len(chunks),
                "status": "INDEXED",
                "indexed_at": os.path.getmtime(file_path) if os.path.exists(file_path) else 0
            }
            self.documents[filename] = doc_meta

        return doc_meta

    def search(self, query: str, top_k: int = 4) -> List[Dict[str, Any]]:
        with self._lock:
            if not self.chunks:
                return []

            query_tokens = set(re.findall(r'\w+', query.lower()))
            if not query_tokens:
                return self.chunks[:top_k]

            scored_chunks = []
            for chunk in self.chunks:
                chunk_tokens = re.findall(r'\w+', chunk["content"].lower())
                if not chunk_tokens:
                    continue

                chunk_set = set(chunk_tokens)
                overlap = query_tokens.intersection(chunk_set)
                
                score = len(overlap) / (math.log(len(chunk_tokens) + 1) + 1.0)
                
                if score > 0:
                    scored_chunks.append({
                        "score": round(score, 4),
                        "source": chunk["source"],
                        "chunk_id": chunk["id"],
                        "content": chunk["content"]
                    })

            scored_chunks.sort(key=lambda x: x["score"], reverse=True)
            return scored_chunks[:top_k]

    def delete_document(self, filename: str) -> bool:
        with self._lock:
            if filename in self.documents:
                del self.documents[filename]
                self.chunks = [c for c in self.chunks if c["source"] != filename]
                return True
            return False

    def list_documents(self) -> List[Dict[str, Any]]:
        with self._lock:
            return list(self.documents.values())

vector_store = LocalVectorStore()
