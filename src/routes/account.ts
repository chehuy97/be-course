import express, { Router } from 'express'
import {
  updateRoleTeacher,
  getAllTeacher,
  getAllStudent,
  getProfile,
  editProfile,
} from '../controllers/accountController'
import { verifyRoleAdmin, verifyToken } from '../middlewares/authMiddleware'

export const accountRouter: Router = express.Router()

//common
accountRouter.get('/profile', verifyToken, getProfile)
accountRouter.put('/profile', verifyToken, editProfile)
//admin
accountRouter.post(
  '/admin/role-teacher',
  verifyToken,
  verifyRoleAdmin,
  updateRoleTeacher
)
accountRouter.get(
  '/admin/teachers',
  verifyToken,
  verifyRoleAdmin,
  getAllTeacher
)
accountRouter.get(
  '/admin/students',
  verifyToken,
  verifyRoleAdmin,
  getAllStudent
)
