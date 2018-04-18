const express = require('express')
const app = express()
const cors = require('cors')
const serialize = require('serialize-javascript')

const comment_music = require('./router/comment_music')
const user = require('./router/user')
const music_url = require('./router/music_url')

import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './src/components/App'
import { matchPath, StaticRouter } from 'react-router-dom'
import { fetchEvent } from './src/api/fetchEvent'
import routes from './src/routes'
// import fetchEvents from './src/api/fetchEvent'

app.use(cors())

app.use('/public', express.static('public'))
//router
app.use('/comment/music', comment_music)
app.use('/user', user)
app.use('/song', music_url)

app.get('*', (req, res) => {
  console.log(req.url)
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}
  console.log(activeRoute)
  fetchEvent().then(data => {
    const context = { data }
    console.log('context:', context.data.length)
    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SSR with RR</title>
      
    </head>

      <body>
        <div id="app">${markup}</div>
        <script src="/public/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__=${serialize(data)}</script>  
      </body>
    </html>
  `)
  })
})

app.listen(process.NODE_ENV || 3000, () => {
  console.log('Server started listening at port http://localhost:3000')
})
