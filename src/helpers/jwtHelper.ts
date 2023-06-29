import jwt, { SignOptions } from  'jsonwebtoken'
import  {configs} from '../configs'

const { publicKey, privateKey, expiresIn } = configs.jwtConfigs

export const generateToken = (data: any, option = {}): String => {
    const options:SignOptions = {...option, algorithm: 'HS256', expiresIn}
    let token = jwt.sign(data, privateKey, options)
    return token
}

export const verifyToken = (token:string, options = {}) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, (error, decoded) => {
            if(error) {
                return reject(error)
            } else {
                return resolve(decoded)
            }
        })
    })
}
