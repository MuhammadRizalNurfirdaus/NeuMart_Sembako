#!/bin/bash

# NeuMart Sembako Server Manager
# Memudahkan start, stop, restart, dan status server

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

show_status() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}   NeuMart Sembako - Server Status${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # Check Backend
    if lsof -Pi :3003 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend:${NC}  http://localhost:3003 (Running)"
    else
        echo -e "${RED}❌ Backend:${NC}  Port 3003 (Not Running)"
    fi
    
    # Check Frontend
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Frontend:${NC} http://localhost:3000 (Running)"
    else
        echo -e "${RED}❌ Frontend:${NC} Port 3000 (Not Running)"
    fi
    echo ""
}

stop_servers() {
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    pkill -f "npm run dev:all" 2>/dev/null
    pkill -f "ts-node-dev" 2>/dev/null
    pkill -f "next dev" 2>/dev/null
    lsof -ti:3003 | xargs kill -9 2>/dev/null
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
    echo -e "${GREEN}✅ All servers stopped${NC}"
    echo ""
}

start_servers() {
    echo -e "${BLUE}🚀 Starting NeuMart Sembako servers...${NC}"
    echo ""
    
    # Stop any existing servers first
    stop_servers
    
    # Start servers in background
    cd "$(dirname "$0")"
    nohup npm run dev:all > /tmp/neumart-dev.log 2>&1 &
    
    echo -e "${YELLOW}⏳ Waiting for servers to start...${NC}"
    sleep 6
    
    # Check if servers started successfully
    if lsof -Pi :3003 -sTCP:LISTEN -t >/dev/null 2>&1 && \
       lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo ""
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}🎉 Servers started successfully!${NC}"
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo -e "  ${BLUE}Frontend:${NC} http://localhost:3000"
        echo -e "  ${BLUE}Backend:${NC}  http://localhost:3003/api"
        echo -e "  ${BLUE}Admin:${NC}    http://localhost:3000/admin"
        echo ""
        echo -e "  ${YELLOW}Logs:${NC}     tail -f /tmp/neumart-dev.log"
        echo ""
    else
        echo -e "${RED}❌ Failed to start servers. Check logs:${NC}"
        echo -e "   tail -f /tmp/neumart-dev.log"
    fi
}

show_logs() {
    echo -e "${BLUE}📋 Server Logs (Ctrl+C to exit)${NC}"
    echo ""
    tail -f /tmp/neumart-dev.log
}

show_help() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}   NeuMart Sembako - Server Manager${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Usage: ./server-manager.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start     Start both backend and frontend servers"
    echo "  stop      Stop all running servers"
    echo "  restart   Restart all servers"
    echo "  status    Show server status"
    echo "  logs      Show server logs (real-time)"
    echo "  help      Show this help message"
    echo ""
}

# Main script
case "$1" in
    start)
        start_servers
        ;;
    stop)
        stop_servers
        ;;
    restart)
        echo -e "${YELLOW}🔄 Restarting servers...${NC}"
        echo ""
        start_servers
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        show_help
        exit 1
        ;;
esac
