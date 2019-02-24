const Joi = require('joi')

module.exports = {
  body: {
    ad: Joi.string().required(),
    content: Joi.string().required(),
    price: Joi.number().required()
  }
}
