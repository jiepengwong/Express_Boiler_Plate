import express from 'express';
import userRoutes from './routes/userRoutes.js';
import {connectToDatabase} from './config/db.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

// Routes 
app.listen(3000, () => console.log("Running on port 3000")); 


connectToDatabase();