const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allows your HTML file to communicate with this server
app.use(express.json()); // Allows the server to understand incoming JSON data

// 1. Connect to MongoDB (Make sure MongoDB is running on your machine!)
const dbURI = 'mongodb+srv://vishalk81025_db_user:BmGLQPSRWwdx2wel@localwebsolutions.l9vvzvf.mongodb.net/?appName=LocalWebSolutions'; 

mongoose.connect(dbURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// 2. Define a Schema and Model for the Form Data
const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    business: { type: String, required: true },
    message: String,
    date: { type: Date, default: Date.now } // Automatically saves the exact time
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// 3. Create the API Route to receive data from your HTML file
app.post('/api/contact', async (req, res) => {
    try {
        // Create a new database entry using the data sent from the website
        const newInquiry = new Inquiry(req.body);
        
        // Save it to MongoDB
        await newInquiry.save();
        
        console.log("New inquiry saved:", req.body);
        res.status(201).json({ message: 'Inquiry saved successfully!' });
    } catch (error) {
        console.error('Error saving inquiry:', error);
        res.status(500).json({ message: 'Failed to save inquiry.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
