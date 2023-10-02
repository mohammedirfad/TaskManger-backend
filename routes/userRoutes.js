import express from 'express';

import { userRegistration ,userLogin  } from '../controller/AuthController.js';

import AsyncError from '../middleware/AsyncError.js'


const router = express.Router();

router.post('/signup',userRegistration);
router.post('/login',userLogin);







export default router;