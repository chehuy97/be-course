import bcrypt from 'bcrypt'

export const encryptPassword = async (password: string) => {
    const saltRounds = 10
  
    const excryptPassword = await bcrypt.hash(password, saltRounds)
  
    return excryptPassword
  }