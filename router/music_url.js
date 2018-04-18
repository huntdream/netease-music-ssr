const express = require('express')
const router = express.Router()

const { createWebAPIRequest } = require('../util/util')

router.get('/', (req, res, next) => {
  let id = req.query.id
  const br = req.query.br || 999000
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    ids: [id],
    br: br,
    csrf_token: ''
  }

  createWebAPIRequest(
    'music.163.com',
    `/weapi/song/enhance/player/url`,
    'POST',
    data,
    cookie,
    music_req => {
      res.setHeader('Content-Type', 'application/json')
      res.send(music_req)
    },
    err => {
      res.status(502).send('fetch error')
    }
  )
})

module.exports = router
