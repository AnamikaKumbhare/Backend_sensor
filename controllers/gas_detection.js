// gas_detection.js

const express = require('express');
const router = express.Router();

router.post('/gas-detection', async (req, res) => {
    try {
        const { rs_ro_ratio, ppm } = req.body; // assuming rs_ro_ratio and ppm come from request body

        console.log(`Processed data - RS/R0 Ratio: ${rs_ro_ratio}, PPM: ${ppm}`);

        return res.status(200).json({
            status: "success",
            message: "Gas data processed successfully",
            data: { rs_ro_ratio, ppm }
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
