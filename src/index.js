import React from 'react'
import { hydrate } from 'react-dom'
import App from './components/App.js'
import { BrowserRouter, Route } from 'react-router-dom'
import routes from './routes'
import './style.css'

hydrate(
  <BrowserRouter>
    <App data={window.__INITIAL_DATA__} />
  </BrowserRouter>,
  document.getElementById('app')
)
