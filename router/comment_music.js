const express = require('express')
const router = express.Router()

const { createWebAPIRequest } = require('../util/util')

router.get('/', (req, res, next) => {
  const rid = req.query.id
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    offset: req.query.offet || 0,
    rid: rid,
    limit: req.query.limit || 100,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/v1/resource/comments/R_SO_4_${rid}/?csrf_token=`,
    'POST',
    data,
    cookie,
    music_req => {
      let result = JSON.parse(music_req)
      res.json(result)
    },
    err => res.status(502).send(err.message)
  )
})

module.exports = router
