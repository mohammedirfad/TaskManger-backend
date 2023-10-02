import express from 'express';

import { 
     createTask ,
     getCurrentUserTasks ,
     completeTodo,
     DeleteTodo
    } from '../controller/TaskController.js';



const router = express.Router();

router.get('/myTasks',getCurrentUserTasks);
router.post('/my',createTask);
router.post('/complete',completeTodo);
router.delete('/delete',DeleteTodo)









export default router;