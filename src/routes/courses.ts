import express, { Router } from 'express'
import { verifyRoleTeacher, verifyToken } from '../middlewares/authMiddleware'
import { createCourse, deleteCourse, getCourses, updateCourse } from '../controllers/coursesController'
import { validate } from '../helpers/validationHelper'
import { createCourseSchema, deleteCourseSchema, updateCourseSchema } from '../validations/courseValidation'

export const courseRouter:Router = express.Router()

courseRouter.get('/courses', getCourses)
courseRouter.post('/teacher/course', verifyToken, verifyRoleTeacher, validate(createCourseSchema), createCourse)
courseRouter.put('/teacher/course', verifyToken, verifyRoleTeacher, validate(updateCourseSchema), updateCourse)
courseRouter.delete('/teacher/course', verifyToken, verifyRoleTeacher, validate(deleteCourseSchema), deleteCourse)