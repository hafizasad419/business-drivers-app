import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';




configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
    {
        origin:"*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
));
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_DB_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Test route
app.get('/api/test', (req, res) => {
    console.log('Test API is working and server is running.');
    res.status(200).json({ message: 'Backend is working!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
