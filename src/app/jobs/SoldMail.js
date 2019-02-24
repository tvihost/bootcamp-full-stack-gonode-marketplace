const Mail = require('../services/Mail')

class SoldMail {
  get key () {
    return 'SoldMail'
  }

  async handle (job, done) {
    const { purchase, user } = job.data

    await Mail.sendMail({
      from: 'Market Place <market@marketplace.com>',
      to: purchase.author.email,
      subject: `Proposta Aceita: ${purchase.ad.title}`,
      template: 'sold',
      context: { purchase, user }
    })

    return done()
  }
}

module.exports = new SoldMail()
