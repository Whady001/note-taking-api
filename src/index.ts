import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongoURI = 'mongodb://127.0.0.1:27017'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});