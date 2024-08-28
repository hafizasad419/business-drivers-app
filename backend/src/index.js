import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['https://business-drivers-frontend.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

// Database connection
// mongoose.connect(process.env.MONGO_DB_URI)
//     .then(() => console.log('MongoDB Connected'))
//     .catch((err) => console.error('MongoDB connection error:', err));

// Test route
app.get('/api/test', (req, res) => {
    console.log('Test API is working and server is running.');
    res.status(200).json({ message: 'Backend is working!' });
});
app.get('/api/asad', (req, res) => {
<a href='https://linkedin.com/in/hafizasad419' target='_blank'>Your Boy Is Here</a>
});

// Example of adding additional routes using app.route()
app.route('/api/test')
    .get((req, res) => {
        // Handle GET request for /api/users
        res.send('GET request to /api/test');
        console.log('GET request to /api/test');
    })
    .post((req, res) => {
        // Handle POST request for /api/users
        res.send('POST request to /api/users');
    });

app.route('/api/products')
    .get((req, res) => {
        // Handle GET request for /api/products
        res.send('GET request to /api/products');
    })
    .post((req, res) => {
        // Handle POST request for /api/products
        res.send('POST request to /api/products');
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server Chal Pya J, http://localhost:${PORT} Tay`);
});
