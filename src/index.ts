
import bodyParser from 'body-parser';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes';
import dotenv from 'dotenv';
const express = require('express');
const mongoose = require('mongoose')
const router = require('./routes/index.route');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://gwezsopaid:0Zw8IUwrFGGSWNmb@noteapi.5s5np.mongodb.net/'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', Error));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});