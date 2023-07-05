import express, { Router } from 'express'
import { verifyRoleTeacher, verifyToken } from '../middlewares/authMiddleware'
import { createCourse, updateCourse } from '../controllers/coursesController'
import { validate } from '../helpers/validationHelper'
import { createCourseSchema, updateCourseSchema } from '../validations/courseValidation'

export const courseRouter:Router = express.Router()

courseRouter.post('/teacher/course', verifyToken, verifyRoleTeacher, validate(createCourseSchema), createCourse)
courseRouter.put('/teacher/course', verifyToken, verifyRoleTeacher, validate(updateCourseSchema), updateCourse)