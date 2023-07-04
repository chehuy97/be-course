import { NextFunction, Request, Response } from "express";
import constants from "../common/constants";
import { verifyToken as verifyAccessToken } from '../helpers/jwtHelper';
import { IUser } from "../models/IUser";


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