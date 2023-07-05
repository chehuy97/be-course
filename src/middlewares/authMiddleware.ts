import { NextFunction, Request, Response } from "express";
import constants from "../common/constants";
import { verifyToken as verifyAccessToken } from '../helpers/jwtHelper';
import { IUser } from "../models/IUser";
import { PrismaClient } from "@prisma/client";
import { Forbidden } from '../helpers/responseHelper'

const prisma = new PrismaClient()

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.body.access_token || req.params.authorization || req.query.authorization || req.headers.authorization ||
        req.cookies.access_token

        if(!token) throw Error(constants.ERROR.NO_TOKEN)

        const [prefixToken, accessToken] = (token as string).split(" ")

        if(prefixToken.toLowerCase() != "bearer") throw Error(constants.ERROR.INVALID_TOKEN_FORMAT)

        const decodeToken = await verifyAccessToken(accessToken) as IUser

        req.params.user = JSON.stringify(decodeToken)

        next()

    } catch (error) {
        next(error)
    }
}

export const verifyRoleAdmin =  async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const user = JSON.parse(req.params.user) as IUser
        const userRoles = await prisma.userRoles.findMany({
            where: {
                user_id: user.user_id
            },
            include: {
                roles: true
            }
        })
        const isAdmin = userRoles.some(item => item.roles.role_name == constants.ROLE.ADMIN)
        if(!isAdmin) return Forbidden(res, {errorMessage: constants.ERROR.ACCESS_DENIED})
        next()
    } catch (error) {
        next(error)
    }
}

export const verifyRoleTeacher =  async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const user = JSON.parse(req.params.user) as IUser
        const userRoles = await prisma.userRoles.findMany({
            where: {
                user_id: user.user_id
            },
            include: {
                roles: true
            }
        })
        const isAdmin = userRoles.some(item => item.roles.role_name == constants.ROLE.TEACHER)
        if(!isAdmin) return Forbidden(res, {errorMessage: constants.ERROR.ACCESS_DENIED})
        next()
    } catch (error) {
        next(error)
    }
}