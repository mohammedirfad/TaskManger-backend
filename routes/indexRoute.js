import express from 'express';
import authRoutes from './userRoutes.js';
import taskRoutes from './taskRoutes.js';
import {checkAuth} from '../middleware/authVerify.js';

const router = express.Router();

router.use('/auth',authRoutes);
router.use('/tasks',checkAuth,taskRoutes);

export default router;