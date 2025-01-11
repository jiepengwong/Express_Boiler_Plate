import express from 'express';
import userRoutes from './routes/userRoutes.js';
import {connectToDatabase} from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();dotenv.config();

const app = express();


// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.use('/api', userRoutes);

// Routes 
app.listen(3000, () => console.log("Running on port 3000")); 


connectToDatabase();