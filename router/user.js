const express = require('express')
const router = express.Router()

const { createWebAPIRequest } = require('../util/util')

router.get('/', (req, res, next) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  let id = req.query.uid

  const data = {
    time: -1,
    getcounts: true,
    limit: 10,
    csrf_token: ''
  }
  createWebAPIRequest(
    'music.163.com',
    `/weapi/event/get/${id}`,
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
