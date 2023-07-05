export interface ICourse {
    course_id: number,
    name: string,
    teacher_id: number,
    amount: number,
    cover: string,
    price: number,
    status: string
    description: string,
    video_intro: string,
    tags: number[]
}