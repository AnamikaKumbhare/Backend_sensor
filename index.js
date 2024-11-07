const express = require("express");
const http = require('http');
const WebSocket = require('ws');
const gasDetectionRoute = require('./controllers/gas_detection');
const webSocketServer = require('./hooks/useWebSocket');

const app = express();
const server = http.createServer(app);
const PORT = 3001;

// Initialize WebSocket server
webSocketServer.initialize(server);

// Add body-parser middleware with increased size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
});

// Debugging middleware to log all requests
app.use((req, res, next) => {
    console.log('Incoming request:');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Use the gas detection route
app.use('/gas-detection', gasDetectionRoute);

// Handle preflight requests
app.options('/gas-detection', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.sendStatus(200);
});

// Start the server
server.listen(PORT, () => {
    console.log(`HTTP Server running on http://192.168.56.1:${PORT}`);
    console.log(`WebSocket Server running on ws://192.168.56.1:${PORT}`);
    console.log("API endpoint: http://192.168.56.1:3001/gas-detection");
});