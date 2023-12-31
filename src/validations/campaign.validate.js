import Joi from 'joi'

const fields = {
  title: Joi.string().required(),
  short_description: Joi.string().optional(),
  body: Joi.string().required(),
  category_ids: Joi.array().items(Joi.number()).required(),
  status: Joi.string().optional().valid('publish', 'archived'),
  goal: Joi.number().required(),
  end_date: Joi.string()
    .optional()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'end_date format is invalid'
    }),
  note: Joi.string().optional().allow(''),
  receiver: Joi.string()
    .required()
    .valid(
      'Saya Sendiri',
      'Keluarga / Kerabat',
      'Organisasi / Lembaga',
      'Lainnya'
    ),
  publish_date: Joi.string()
    .optional()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'publish_date format is invalid'
    }),
  path_image: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//)
  }).required()
}

const campaignCreateValidation = Joi.object({
  ...fields
})

const campaignUpdateValidation = Joi.object({
  ...fields,
  body: Joi.string().optional(),
  category_ids: Joi.array().items(Joi.number()).optional(),
  goal: Joi.number().optional(),
  receiver: Joi.string()
    .optional()
    .valid(
      'Saya Sendiri',
      'Keluarga / Kerabat',
      'Organisasi / Lembaga',
      'Lainnya'
    ),
  path_image: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//)
  }).optional()
})

const campaignIdValidation = Joi.number().required().label('campaign_id')

const campaignFiltersValidation = Joi.object({
  keyword: Joi.string().optional().allow(''),
  size: Joi.number().optional().allow(''),
  page: Joi.number().optional().allow(''),
  sort_by: Joi.string()
    .valid('title', 'publish_date', 'status')
    .optional()
    .allow(''),
  sort_value: Joi.string().valid('asc', 'desc').optional().allow(''),
  status: Joi.string()
    .valid('publish', 'pending', 'archived')
    .optional()
    .allow(''),
  start_date: Joi.string()
    .optional()
    .allow('')
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'start_date format is invalid'
    }),
  end_date: Joi.string()
    .optional()
    .allow('')
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'end_date format is invalid'
    })
}).and('start_date', 'end_date')

export {
  campaignCreateValidation,
  campaignUpdateValidation,
  campaignIdValidation,
  campaignFiltersValidation
}
