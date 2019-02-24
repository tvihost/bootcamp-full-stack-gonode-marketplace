const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const Queue = require('../services/Queue')
const PurchaseMail = require('../jobs/PurchaseMail')
const SoldMail = require('../jobs/SoldMail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    if (!purchaseAd) {
      return res.status(400).json({ error: 'Ad Invalid' })
    }

    const purchase = await Purchase.create({ ...req.body, author: req.userId })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }

  async sold (req, res) {
    const purchase = await Purchase.findById(req.params.purchaseId).populate([
      'ad',
      'author'
    ])

    if (purchase.ad.author.toString() !== req.userId) {
      return res.status(401).json({ error: 'User Invalid' })
    }

    if (purchase.ad.purchasedBy) {
      return res.status(400).json({ error: 'Este produto já foi vendido' })
    }

    try {
      await Ad.findByIdAndUpdate(purchase.ad._id, {
        purchasedBy: purchase.author._id
      })
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    const user = await User.findById(req.userId)

    Queue.create(SoldMail.key, {
      purchase,
      user
    }).save()

    return res.json({ success: 'Venda aceita.' })
  }
}

module.exports = new PurchaseController()
