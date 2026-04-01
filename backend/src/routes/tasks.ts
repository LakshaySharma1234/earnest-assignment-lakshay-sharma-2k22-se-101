import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
} from '../controllers/tasks';

const tasksRouter = Router();

tasksRouter.use(authMiddleware);

tasksRouter.get('/', getTasks);
tasksRouter.post('/', createTask);
tasksRouter.get('/:id', getTaskById);
tasksRouter.patch('/:id', updateTask);
tasksRouter.delete('/:id', deleteTask);
tasksRouter.post('/:id/toggle', toggleTask);

export default tasksRouter;
