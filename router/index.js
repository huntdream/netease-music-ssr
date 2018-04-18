const express = require('express')
const router = express.Router()

const Encrypt = require('../util/crypto')

router.get('/', (req, res, next) => {
  res.json({ name: 'hello', encypted: Encrypt('hello') })
})

module.exports = router
