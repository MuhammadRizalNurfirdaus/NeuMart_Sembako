#!/bin/bash

# Script untuk menjalankan Backend dan Frontend NeuMart Sembako
# Author: NeuMart Team
# Date: 2025-12-26

echo "🚀 Starting NeuMart Sembako..."
echo ""

# Warna untuk output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Kill existing processes
echo -e "${YELLOW}🛑 Stopping existing servers...${NC}"
pkill -f "ts-node-dev" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

# Start Backend
echo -e "${BLUE}🔧 Starting Backend Server...${NC}"
cd "$DIR/backend"
npm run dev > /tmp/neumart-backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"

# Wait for backend to be ready
echo "⏳ Waiting for backend to start..."
sleep 5

# Check if backend is running
if curl -s http://localhost:3003/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is ready at http://localhost:3003${NC}"
else
    echo -e "${RED}❌ Backend failed to start. Check logs: tail -f /tmp/neumart-backend.log${NC}"
    exit 1
fi

# Start Frontend
echo -e "${BLUE}🎨 Starting Frontend Server...${NC}"
cd "$DIR/frontend"
npm run dev > /tmp/neumart-frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"

# Wait for frontend
echo "⏳ Waiting for frontend to start..."
sleep 5

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is ready at http://localhost:3000${NC}"
else
    echo -e "${RED}❌ Frontend failed to start. Check logs: tail -f /tmp/neumart-frontend.log${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 NeuMart Sembako is running!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "📱 Frontend:  ${BLUE}http://localhost:3000${NC}"
echo -e "🔌 Backend:   ${BLUE}http://localhost:3003/api${NC}"
echo -e "👤 Admin:     ${BLUE}http://localhost:3000/admin${NC}"
echo ""
echo "📋 Logs:"
echo "   Backend:  tail -f /tmp/neumart-backend.log"
echo "   Frontend: tail -f /tmp/neumart-frontend.log"
echo ""
echo "🛑 To stop servers:"
echo "   pkill -f 'ts-node-dev'"
echo "   pkill -f 'next dev'"
echo ""
echo "Press Ctrl+C to exit (servers will keep running in background)"
echo ""

# Keep script running
tail -f /dev/null
