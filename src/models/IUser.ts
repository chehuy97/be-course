export interface IUser {
    user_id: number,
    email: string,
    fullname: string,
    gender: string,
    dateOfBirth:string,
    avatar:string,
    phone:string,
    username:string,
    create_at?: Date,
    delete_at?: Date
}