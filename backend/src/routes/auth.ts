import { Router } from 'express';
import { register, login, refreshAccessToken, logout } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refreshAccessToken);
authRouter.post('/logout', logout);

export default authRouter;
