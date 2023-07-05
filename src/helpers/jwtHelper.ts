import jwt, { SignOptions } from 'jsonwebtoken'
import configs from '../configs'
import constants from '../common/constants'
import { Request } from 'express'

const { publicKey, privateKey } = configs.jwtConfigs

export const generateToken = (data: any, option = {}): String => {
  const options: SignOptions = { ...option, algorithm: "RS256" }
  let token = jwt.sign(data, privateKey, options)
  return `Bearer ${token}`
}

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, (error, decoded) => {
      if (error) {
        return reject(new Error(constants.ERROR.EXPIRED_TOKEN))
      } else {
        return resolve(decoded)
      }
    })
  })
}

