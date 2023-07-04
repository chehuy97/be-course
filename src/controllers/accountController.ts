import { NextFunction, Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import { IUser } from '../models/IUser'
import { SuccessResponse } from '../helpers'

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