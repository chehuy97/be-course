import { Request, Response } from 'express';
import { SuccessResponse } from '../helpers/responseHelper';

export const demo = (req: Request, res: Response) => {
  res.send('Hello world');
};

export const login = (req: Request, res: Response) => {
  console.log('login');
  res.send('Hello login');
};

export const generateNewToken = (req: Request, res: Response) => {
  console.log('generateNewToken');
  res.send('Hello generateNewToken');
};

export const logout = (req: Request, res: Response) => {
  console.log('logout');
  res.send('Hello logout');
};
