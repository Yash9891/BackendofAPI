const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json({ limit: '10mb' }));

app.post("/bfhl", (req, res) => {
    const { data, file_b64 } = req.body;

    // Basic validation
    if (!data) {
        return res.status(400).json({ is_success: false, message: "Data is required" });
    }

    // Process the data
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    
    // Handle highest lowercase alphabet
    let highestLowercaseAlphabet = null;
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    if (lowercaseAlphabets.length > 0) {
        highestLowercaseAlphabet = lowercaseAlphabets.sort().slice(-1)[0]; // Get the highest one
    }

    // Handle file_b64 validity
    let file_valid = false;
    let file_mime_type = "";
    let file_size_kb = 0;

    if (file_b64) {
        const parts = file_b64.split(",");
        if (parts.length > 1) {
            file_valid = true; // Assume valid for demo purposes
            file_mime_type = parts[0].match(/:(.*?);/)[1];
            file_size_kb = Buffer.byteLength(parts[1], 'base64') / 1024; // Size in KB
        }
    }

    return res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet, // Return the highest lowercase alphabet
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
