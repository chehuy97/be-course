import request from 'supertest'
import { authRepository } from '../src/repositories'
import app from '../src/server'
import { encryptPassword } from '../src/helpers/encryptHelper'
import constants from '../src/common/constants'

describe("Login case", () => {
    it("Should return 200 successful credential", async () => {
        const email = 'user123@gmail.com'
        const password = '12345678'
        const encryptPass = await encryptPassword(password)
        jest.spyOn(authRepository, 'findUser').mockResolvedValue({
            user_id: 1,
            email,
            password: encryptPass,
            fullname: "user abc",
            gender: 'male',
            type: 'normal',
            dateOfBirth: '1-1-1997',
            avatar: 'abc.jpg',
            phone: '0123456789',
            username: 'user123'

        })
        const response = await request(app)
        .post('/api/auth/login')
        .send({email, password})

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty('access_token')
    })

    it("Should return 401 unauthorized", async () => {
        jest.spyOn(authRepository, 'findUser').mockResolvedValue(null)
        const response = await request(app)
        .post('/api/auth/login')
        .send({email: "user123@gmail.com", password: "12345678"})

        expect(response.status).toBe(401)    
        expect(response.body.data.errorMessage).toBe(constants.ERROR.INVALID_ACCOUNT)
    })
})

describe("Register case", () => {
    it("Regiter user success", async () => {
        const user = {
            user_id: 3,
            email: "student1@email.com",
            fullname: "Student1",
            gender: "Male",
            dateOfBirth: "1980-06-23",
            avatar: "img/base_64.png",
            phone: "+04827826277",
            username: "student122",
            password: "12345678",
            type: "normal",
            userRoles: [
                {
                    "user_id": 3,
                    "role_id": 1,
                    "roles": {
                        "role_id": 1,
                        "role_name": "student"
                    }
                }
            ]
        }
        jest.spyOn(authRepository, 'findRole').mockResolvedValue({
            role_id: 1,
            role_name: 'student'
        })
        jest.spyOn(authRepository, 'findUser').mockResolvedValue(null)
        jest.spyOn(authRepository, 'createUser').mockResolvedValue(user)
        
        const response = await request(app)
        .post('/api/auth/register')
        .send({
            email: "student1@email.com",
            fullname: "Student1",
            gender: "Male",
            dateOfBirth: "1980-06-23",
            avatar: "img/base_64.png",
            phone:"+04827826277",
            username: "student122",
            password: "12345678"
        })

        expect(response.status).toBe(201)
        // expect(response.body.data).toEqual(user)
    })
})