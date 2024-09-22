//index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for large files

app.post("/bfhl", (req, res) => {
    const { data, file_b64 } = req.body;

    // Basic validation
    if (!data) {
        return res.status(400).json({ is_success: false, message: "Data is required" });
    }

    // Process the data
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets
        .filter(item => item.toLowerCase() === item)
        .sort()
        .slice(-1);

    // Handle file_b64 validity
    let file_valid = false;
    let file_mime_type = "";
    let file_size_kb = 0;

    if (file_b64) {
        // Assuming file_b64 is valid for demo purposes
        file_valid = true; // Set this based on actual validation
        file_mime_type = "image/png"; // Determine based on file content
        file_size_kb = Buffer.byteLength(file_b64, 'base64') / 1024; // Size in KB
    }

    return res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
