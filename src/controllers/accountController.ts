import { NextFunction, Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import { IUser } from '../models/IUser'
import { SuccessResponse } from '../helpers/responseHelper'
import constants from '../common/constants'

const prisma = new PrismaClient()

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authUser = JSON.parse(req.params.user) as IUser
        const user = await prisma.users.findFirst({
          where: {
            user_id: authUser.user_id
          }
        })
        return SuccessResponse(res, user) 
    } catch (error) {
        next(error)
    }
}

export const editProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body
      const updatedUser = await prisma.users.update({
        where: {user_id: user.user_id},
        data: { ...user}
      })
      
      return SuccessResponse(res, updatedUser)
    } catch (error) {
      next(error)
    }
}

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
