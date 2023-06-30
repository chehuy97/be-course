import express, { Router } from 'express';
import {
  login,
  generateNewToken,
  demo,
  logout,
  register,
} from '../controllers/authController';

export const authRouter: Router = express.Router();

authRouter.get('/', demo);
authRouter.get('/register', register);
authRouter.post('/login', login);
authRouter.post('/token', generateNewToken);
authRouter.post('/logout', logout);
