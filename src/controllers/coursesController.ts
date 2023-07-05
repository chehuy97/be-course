import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '../helpers/responseHelper'
import moment, { months } from 'moment'
import constants from '../common/constants'
import { IUser } from '../models/IUser'

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
