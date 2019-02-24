const kue = require('kue')
const jobs = require('../jobs')
const Sentry = require('@sentry/node')
const redisConfig = require('../../config/redis')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)
Queue.process(jobs.SoldMail.key, jobs.SoldMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
