import Profile from '../components/Profile'
import Event from '../components/Event'

import React from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    component: Event
  },
  {
    path: '/profile',
    exact: true,
    component: Profile
  },
  {
    path: '/hello',
    exact: true,
    component: () => <div>Hello</div>
  }
]

export default routes
