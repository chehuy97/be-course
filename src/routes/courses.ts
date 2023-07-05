import express, { Router } from 'express'
import { verifyRoleTeacher, verifyToken } from '../middlewares/authMiddleware'
import { createCourse } from '../controllers/coursesController'
import { validate } from '../helpers/validationHelper'
import { courseSchema } from '../validations/courseValidation'

export const courseRouter:Router = express.Router()

courseRouter.post('/teacher/course', verifyToken, verifyRoleTeacher, validate(courseSchema), createCourse)