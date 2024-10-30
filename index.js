
const express = require("express");
const app = express();
const gasDetectionRoute = require('./controllers/gas_detection'); // Adjust path if in a different directory
const PORT = 3001;

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

// Gas detection route
app.use('/api', gasDetectionRoute);

// Handle preflight requests
app.options('/api/gas_detection', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://192.168.56.1:${PORT}`);
    console.log("API endpoint: http://192.168.56.1:3001/api/gas_detection");
});
