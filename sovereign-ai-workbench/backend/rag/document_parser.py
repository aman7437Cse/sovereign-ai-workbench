import os
from typing import List, Dict, Any
import pypdf

class DocumentParser:
    """
    Parses PDF, DOCX, and TXT documents into readable text chunks with metadata.
    """

    def parse_file(self, file_path: str) -> List[Dict[str, Any]]:
        if not os.path.exists(file_path):
            return []

        filename = os.path.basename(file_path)
        ext = os.path.splitext(filename)[1].lower()
        full_text = ""

        if ext == ".pdf":
            try:
                reader = pypdf.PdfReader(file_path)
                pages_text = []
                for idx, page in enumerate(reader.pages):
                    txt = page.extract_text() or ""
                    pages_text.append(f"--- Page {idx+1} ---\n{txt}")
                full_text = "\n".join(pages_text)
            except Exception as e:
                full_text = f"Error reading PDF {filename}: {str(e)}"

        elif ext == ".docx":
            try:
                import docx
                doc = docx.Document(file_path)
                full_text = "\n".join([p.text for p in doc.paragraphs if p.text])
            except Exception as e:
                full_text = f"Error reading DOCX {filename}: {str(e)}"

        else: # TXT, LOG, CSV
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    full_text = f.read()
            except Exception as e:
                full_text = f"Error reading text file {filename}: {str(e)}"

        return self.chunk_text(full_text, source=filename)

    def chunk_text(self, text: str, source: str, chunk_size: int = 500, overlap: int = 100) -> List[Dict[str, Any]]:
        if not text.strip():
            return []

        chunks = []
        start = 0
        text_len = len(text)
        chunk_idx = 1

        while start < text_len:
            end = min(start + chunk_size, text_len)
            chunk_content = text[start:end]
            
            chunks.append({
                "id": f"{source}-chunk-{chunk_idx}",
                "source": source,
                "chunk_index": chunk_idx,
                "content": chunk_content.strip()
            })
            
            start += chunk_size - overlap
            chunk_idx += 1

        return chunks

document_parser = DocumentParser()
