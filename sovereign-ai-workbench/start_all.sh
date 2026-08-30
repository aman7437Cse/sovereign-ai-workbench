#!/bin/bash
echo "=========================================================="
echo "      LAUNCHING SOVEREIGN AI WORKBENCH PLATFORM           "
echo "=========================================================="

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Start Backend Server
echo "[1/2] Starting FastAPI Backend on http://127.0.0.1:8000..."
cd "$SCRIPT_DIR/backend"
PYTHONPATH=. ./venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

sleep 2

# Start Frontend Dev Server
echo "[2/2] Starting React Vite Frontend on http://localhost:5173..."
cd "$SCRIPT_DIR/frontend"
npm run dev -- --host 127.0.0.1 &
FRONTEND_PID=$!

echo "=========================================================="
echo "Sovereign AI Workbench is RUNNING!"
echo "Frontend: http://127.0.0.1:5173"
echo "Backend:  http://127.0.0.1:8000"
echo "=========================================================="

wait $BACKEND_PID $FRONTEND_PID
