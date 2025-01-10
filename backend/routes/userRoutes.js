import { getUsers, getUserById } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

export default router;  