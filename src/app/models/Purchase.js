const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const PurchaseSchema = new mongoose.Schema({
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

PurchaseSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', PurchaseSchema)
