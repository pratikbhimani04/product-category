const joi = require('joi');

const AddCategoryReqSchema = {
    body: joi.object({
        category: joi.string().required(),
        subcategories: joi.array().items(joi.object()),
    })
}

const AddSubCategoryReqSchema = {
    body: joi.object({
        sub_name: joi.string().required()
    }),
    params: joi.object({
        id: joi.string().required()
    })
}

const UpdateCategoryReqSchema = {
    body: joi.object({
        category: joi.string().required(),
        subcategories: joi.array().items(joi.object()),
    }),
    params: joi.object({
        id: joi.string().required()
    })
}

const DeleteCategoryReqSchema = {
    params: joi.object({
        id: joi.string().required()
    })
}

module.exports = {
    AddCategoryReqSchema,
    AddSubCategoryReqSchema,
    UpdateCategoryReqSchema,
    DeleteCategoryReqSchema
}