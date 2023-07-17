import Joi from "joi";

export const createCourseSchema = Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().optional(),
    cover: Joi.string().required(),
    price: Joi.number().required(),
    tag_id: Joi.number().required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    video_intro: Joi.string().required()
})

export const updateCourseSchema = Joi.object({
    course_id: Joi.number().required(),
    name: Joi.string().optional(),
    amount: Joi.number().optional(),
    cover: Joi.string().optional(),
    price: Joi.number().optional(),
    status: Joi.string().optional(),
    description: Joi.string().optional(),
    video_intro: Joi.string().optional()
})

export const deleteCourseSchema = Joi.object({
    course_id: Joi.number().required(),
})