const express = require('express');
const router = express.Router();
const webSocketServer = require('../hooks/useWebSocket');

router.post('/gas_detection', async (req, res) => {
    try {
        const { rs_ro_ratio, ppm } = req.body;

        const gasData = {
            type: 'gas_detection',
            data: {
                rs_ro_ratio,
                ppm,
                timestamp: new Date().toISOString()
            }
        };

        console.log(`Processed data - RS/R0 Ratio: ${rs_ro_ratio}, PPM: ${ppm}`);
        
        // Broadcast the data to all connected WebSocket clients
        webSocketServer.broadcast(gasData);

        // Log the number of connected clients
        const clientCount = webSocketServer.getConnectedClientsCount();
        console.log(`Broadcasted to ${clientCount} connected clients`);

        return res.status(200).json({
            status: "success",
            message: "Gas data processed and broadcast successfully",
            data: gasData.data,
            websocket_clients: clientCount
        });
    } catch (error) {
        console.error("Error processing gas detection data:", error);
        return res.status(500).json({
            status: "failed",
            message: "Error occurred",
            error: error.message
        });
    }
});

module.exports = router;