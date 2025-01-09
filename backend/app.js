import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

// Routes 
app.listen(3000, () => console.log("Running on port 3000")); 
