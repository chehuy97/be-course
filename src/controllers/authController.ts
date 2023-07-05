import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { BadRequest, SuccessResponse } from '../helpers/responseHelper'
import {
  generateToken,
  verifyToken,
} from '../helpers/jwtHelper'
import { encryptPassword } from '../helpers/encryptHelper'
import constants from '../common/constants'
import bcrypt from 'bcrypt'
import { IUser } from '../models/IUser'

const prisma = new PrismaClient()

export const demo = (req: Request, res: Response) => {
  res.send('Hello world')
}

export const addRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleName } = req.body
    const existedRole = await prisma.roles.findFirst({
      where: { role_name: roleName },
    })
    if (existedRole) {
      throw Error('Role existed')
    }
    const role = await prisma.roles.create({
      data: {
        role_name: roleName,
      },
    })
    return SuccessResponse(res, role)
  } catch (err) {
    next(err)
  }
}

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await prisma.roles.findMany()
    return SuccessResponse(res, roles)
  } catch (err) {
    return BadRequest(res, err)
  }
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {
      email,
      fullname,
      gender,
      dateOfBirth,
      avatar,
      phone,
      username,
      password,
    } = req.body
    const studentRole = await prisma.roles.findFirst({
      where: { role_name: 'student' },
    })

    if (!studentRole) {
      throw Error(constants.ERROR.STUDENT_ROLE_NOT_FOUND)
    }

    const existedStudent = await prisma.users.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })

    if (existedStudent) {
      throw Error(constants.ERROR.EXISTED_INFO_REGISTER)
    }

    const excryptPassword = await encryptPassword(password)

    const user = await prisma.users.create({
      data: {
        email,
        fullname,
        gender,
        dateOfBirth,
        avatar,
        phone,
        username,
        password: excryptPassword,
        userRoles: {
          create: [
            {
              roles: {
                connect: { role_id: studentRole.role_id },
              },
            },
          ],
        },
      },
      include: {
        userRoles: {
          include: {
            roles: true,
          },
        },
      },
    })
    return SuccessResponse(res, user)
  } catch (err) {
    next(err)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    })
    if (!user) {
      throw Error(constants.ERROR.INVALID_ACCOUNT)
    }
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (!isMatchPassword) {
      throw Error(constants.ERROR.INVALID_ACCOUNT)
    }
    const access_token = generateToken(user as IUser, {
      expiresIn: constants.JWT.JWT,
    })
    const refresh_token = generateToken(user, {
      expiresIn: constants.JWT.JWT_REFRESH,
    })
    return SuccessResponse(res, { access_token, refresh_token, user })
  } catch (err) {
    next(err)
  }
}

export const generateNewToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refresh_token } = req.body

    const [prefixToken, token] = (refresh_token as string).split(" ")

    if(prefixToken.toLowerCase() != "bearer") {
      throw Error(constants.ERROR.INVALID_TOKEN_FORMAT)
    }

    const decoded = await verifyToken(token) as IUser
    const user = await prisma.users.findFirst({
      where: {
        email: decoded.email,
      },
    })
    if (!user) {
      throw Error(constants.ERROR.INVALID_TOKEN)
    }
    const access_token = generateToken(user as IUser, {
      expiresIn: constants.JWT.JWT,
    })
    const new_refresh_token = generateToken(user as IUser, {
      expiresIn: constants.JWT.JWT_REFRESH,
    })
    return SuccessResponse(res, {
      access_token,
      refresh_token: new_refresh_token,
    })
  } catch (err) {
    next(err)
  }
}

export const forgotPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('Forgot password')
}

export const resetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('Reset password')
}

export const logout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('logout')
}
