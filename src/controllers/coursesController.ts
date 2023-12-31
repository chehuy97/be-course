import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '../helpers/responseHelper'
import moment from 'moment'
import constants from '../common/constants'
import { IUser } from '../models/IUser'
import { ICourse } from '../models/ICourse'

const prisma = new PrismaClient()

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.params.user) as IUser

    const {
      name,
      amount,
      cover,
      price,
      tag_id,
      status,
      description,
      video_intro,
    } = req.body

    const existedCourse = await prisma.courses.findFirst({
      where: {
        AND: [
            {teacher_id: user.user_id},
            {name}
        ]
      }
    })

    if(existedCourse) {
      throw Error(constants.ERROR.COURSE_EXISTED)
    }

    const course = await prisma.courses.create({
      data: {
        name,
        teacher_id: user.user_id,
        amount,
        cover,
        price,
        status,
        description,
        video_intro,
        create_at: moment(Date()).format(constants.DATE.DATE_TIME),
        tagCourses: {
          create: [
            {
              tags: {
                connect: {
                  tag_id: tag_id,
                },
              },
            },
          ],
        },
      },
      include: {
        tagCourses: {
          include: {
            tags: true,
          },
        },
      },
    })

    return SuccessResponse(res, course)
  } catch (error) {
    next(error)
  }
}

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.params.user) as IUser
    const courseRequest = req.body as ICourse
    const updatedCourse = await prisma.courses.update({
      where: {course_id: courseRequest.course_id},
      data: {...courseRequest, teacher_id: user.user_id}
    })
    return SuccessResponse(res, updatedCourse)
  } catch (error) {
    next(error)
  }
}

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await prisma.courses.findMany()
    return SuccessResponse(res, courses)
  } catch (error) {
    next(error)
  }
}

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course_id } = req.body
    const course = await prisma.courses.delete({
      where: {
        course_id
      }
    })
    return SuccessResponse(res, {message: 'Delete successfully', course})
  } catch (error) {
    next(error)
  }
}

