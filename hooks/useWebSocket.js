const WebSocket = require('ws');

class WebSocketServer {
    constructor() {
        this.wss = null;
    }

    initialize(server) {
        this.wss = new WebSocket.Server({ server });
        
        this.wss.on('connection', (ws, req) => {
            const clientIp = req.socket.remoteAddress;
            console.log(`New WebSocket client connected from ${clientIp}`);
            
            // Send welcome message
            ws.send(JSON.stringify({
                type: 'connection',
                message: 'Connected to gas detection server'
            }));

            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });

            ws.on('close', () => {
                console.log(`Client ${clientIp} disconnected`);
            });
        });

        console.log('WebSocket server initialized');
    }

    broadcast(data) {
        if (!this.wss) {
            console.warn('WebSocket server not initialized');
            return;
        }

        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                try {
                    client.send(JSON.stringify(data));
                } catch (error) {
                    console.error('Error broadcasting to client:', error);
                }
            }
        });
    }

    getConnectedClientsCount() {
        return this.wss ? this.wss.clients.size : 0;
    }
}

module.exports = new WebSocketServer();