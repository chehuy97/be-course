import Joi from "joi";

export const courseSchema = Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().optional(),
    cover: Joi.string().required(),
    price: Joi.number().required(),
    tag_id: Joi.number().required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    video_intro: Joi.string().required()
})