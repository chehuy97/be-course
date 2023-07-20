import jwt, { SignOptions } from 'jsonwebtoken'
import configs from '../configs'
import constants from '../common/constants'
import { Request } from 'express'

const {
  publicAccessKey,
  privateAccessKey,
  publicRefreshKey,
  privateRefreshKey,
} = configs.jwtConfigs

export enum TokenType {
  ACCESS,
  REFRESH,
}

export const generateToken = (
  data: any,
  option = {},
  type: TokenType = TokenType.ACCESS
): String => {
  const options: SignOptions = { ...option, algorithm: 'RS256' }
  const privateKey = (() => {
    switch (type) {
      case TokenType.ACCESS:
        return privateAccessKey
      case TokenType.REFRESH:
        return privateRefreshKey
      default:
        return ''
    }
  })()
  let token = jwt.sign(data, privateKey, options)
  return `Bearer ${token}`
}

export const verifyToken = (token: string, type: TokenType = TokenType.ACCESS) => {
  return new Promise((resolve, reject) => {
    const publicKey = (() => {
      switch (type) {
        case TokenType.ACCESS:
          return publicAccessKey
        case TokenType.REFRESH:
          return publicRefreshKey
        default:
          return ''
      }
    })()
    jwt.verify(token, publicKey, (error, decoded) => {
      if (error) {
        return reject(new Error(constants.ERROR.EXPIRED_TOKEN))
      } else {
        return resolve(decoded)
      }
    })
  })
}
