
import bodyParser from 'body-parser';
import cors from 'cors';
import noteRoutes from './src/routes/noteRoutes';
import { logger } from "./src/middlewares/logger";
import {errorHandler} from './src/middlewares/errorHandler'

const express = require('express');
const mongoose = require('mongoose')
const router = require('./routes/index.route');

import dotenv from 'dotenv';
//import { error } from 'node:console';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://gwezsopaid:0Zw8IUwrFGGSWNmb@noteapi.5s5np.mongodb.net/'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {console.error('MongoDB connection error:', error)});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});