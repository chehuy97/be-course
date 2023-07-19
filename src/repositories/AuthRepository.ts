import { PrismaClient } from '@prisma/client'

export default class AuthRepository {
    private prisma = new PrismaClient()

    findUser = async (obtions:object) => {
        const user = await this.prisma.users.findFirst({
            where: {...obtions}
        })
        return user
    }

    createUser = async (obtions:object) => {
        const user = await this. prisma.users.create({
            data: obtions as any,
            include: {
              userRoles: {
                include: {
                  roles: true,
                },
              },
            },
          })
        return user  
    }

    findRole = async (roleName: string) => {
        const studentRole = await this.prisma.roles.findFirst({
            where: { role_name: roleName },
          })
        return studentRole  
    }




}