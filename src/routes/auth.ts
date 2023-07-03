import express, { Router } from 'express';
import {
  login,
  generateNewToken,
  demo,
  logout,
  register,
  addRole,
  getAllRoles
} from '../controllers/authController';

export const authRouter: Router = express.Router();

authRouter.get('/', demo);
authRouter.post('/role', addRole)
authRouter.get('/role', getAllRoles)
authRouter.get('/register', register);
authRouter.post('/login', login);
authRouter.post('/token', generateNewToken);
authRouter.post('/logout', logout);
