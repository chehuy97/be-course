import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { BadRequest, SuccessResponse } from '../helpers'
import {
  encryptPassword,
  generateToken,
  verifyToken,
} from '../helpers/authHelper'
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
  next: (err: any) => void
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
  next: (err: any) => void
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
  next: (err: any) => void
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
  next: (err: any) => void
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
  next: (err: any) => void
) => {
  try {
    const { refresh_token } = req.body
    const decoded = (await verifyToken(refresh_token)) as IUser
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
  next: (err: any) => void
) => {
  res.send('Forgot password')
}

export const resetPassword = (
  req: Request,
  res: Response,
  next: (err: any) => void
) => {
  res.send('Reset password')
}

export const logout = (
  req: Request,
  res: Response,
  next: (err: any) => void
) => {
  res.send('logout')
}
