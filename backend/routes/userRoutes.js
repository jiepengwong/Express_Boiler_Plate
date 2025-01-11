import { getUsers, getUserById,  registerUser, loginUser, logoutUser} from '../controllers/userController.js';
import express from 'express';
import authenticateJWT from '../middleware/authentication.js';
const router = express.Router();

router.get('/users', authenticateJWT, getUsers);

router.get('/users/:id', getUserById);

router.post('/users/register', registerUser);

router.post('/users/login', loginUser);

router.post('/users/logout', logoutUser);

export default router;  