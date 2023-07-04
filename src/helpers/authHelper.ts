import jwt, { SignOptions } from 'jsonwebtoken'
import configs from '../configs'
import bcrypt from 'bcrypt'

const { publicKey, privateKey } = configs.jwtConfigs

export const generateToken = (data: any, option = {}): String => {
  const options: SignOptions = { ...option, algorithm: "RS256" }
  let token = jwt.sign(data, privateKey, options)
  return token
}

export const verifyToken = (token: string, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, (error, decoded) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(decoded)
      }
    })
  })
}

export const encryptPassword = async (password: string) => {
  const saltRounds = 10

  const excryptPassword = await bcrypt.hash(password, saltRounds)

  return excryptPassword
}
