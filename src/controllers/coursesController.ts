import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '../helpers/responseHelper'
import moment, { months } from 'moment'

const prisma = new PrismaClient()

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      teacher_id,
      amount,
      cover,
      price,
      tag_id,
      status,
      description,
      video_intro,
    } = req.body
    const course = await prisma.courses.create({
      data: {
        name,
        teacher_id,
        amount,
        cover,
        price,
        status,
        description,
        video_intro,
        create_at: moment(Date()).format('YYYY-MM-DD HH:mm:ss'),
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
