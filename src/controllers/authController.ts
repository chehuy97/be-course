import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { BadRequest, SuccessResponse } from '../helpers';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const demo = (req: Request, res: Response) => {
  res.send('Hello world');
};

export const addRole = async (req: Request, res: Response) => {
  try {
    const { roleName } = req.body;
    const role = await prisma.roles.create({
      data: {
        role_name: roleName,
      },
    });
    return SuccessResponse(res, role);
  } catch {
    return BadRequest(res, { err: 'Bad request' });
  }
};

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.roles.findMany();
    console.log("DATA", roles)
    return SuccessResponse(res, roles);
  } catch(err) {
    console.log("ERR", err)
    return BadRequest(res, err);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    let { email, fullname, age, gender, dateOfBirth, avatar, phone } = req.body;

    const studentRole = await prisma.roles.findFirst({
      where: { role_name: 'student' },
    });

    if (!studentRole) {
      throw Error('Student role not found');
    }

    const user = prisma.users.create({
      data: {
        email,
        fullname,
        age,
        gender,
        dateOfBirth,
        avatar,
        phone,
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
    });

    return SuccessResponse(res, user);
  } catch (err: any) {
    return BadRequest(res, { error: err });
  }
};

export const login = (req: Request, res: Response) => {
  console.log('login');
  res.send('Hello login');
};

export const generateNewToken = (req: Request, res: Response) => {
  console.log('generateNewToken');
  res.send('Hello generateNewToken');
};

export const logout = (req: Request, res: Response) => {
  console.log('logout');
  res.send('Hello logout');
};
