const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, content } = job.data
    // try {
    await Mail.sendMail({
      from: 'Davi Fonseca <contato@tvihost.net>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })
    // } catch (err) {
    //   const Queue = require('../services/Queue')
    //   Queue.create('PurchaseMail', {
    //     ad,
    //     user,
    //     content
    //   })
    //     .delay(30000)
    //     .save()
    // }

    return done()
  }
}

module.exports = new PurchaseMail()
