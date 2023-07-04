import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import constants from '../common/constants'
import { SuccessResponse } from '../helpers'

const prisma = new PrismaClient()

export const updateRoleTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.body
    const roleTeacher = await prisma.roles.findFirst({
      where: {
        role_name: constants.ROLE.TEACHER,
      },
    })
    await prisma.userRoles.create({
      data: {
        user_id: user_id,
        role_id: roleTeacher!!.role_id
      }
    })
    return SuccessResponse(res, {message: "Upgrade role teacher successfully"})
  } catch (error) {
    next(error)
  }
}

export const getAllTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teachers = await prisma.users.findMany({
      where: {
        userRoles: {
          some: {
            roles: {
              role_name: constants.ROLE.TEACHER
            }
          }
        }
      },
      include: {
        userRoles: {
          include: {
            roles: true
          }
        }
      }
    })
    return SuccessResponse(res, teachers)
  } catch (error) {
    next(error)
  }
}

export const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await prisma.users.findMany({
      where: {
        userRoles: {
          some: {
            roles: {
              role_name: constants.ROLE.STUDENT
            }
          }
        }
      },
      include: {
        userRoles: {
          include: {
            roles: true
          }
        }
      }
    })
    return SuccessResponse(res, students)
  } catch (error) {
    next(error)
  }
}
