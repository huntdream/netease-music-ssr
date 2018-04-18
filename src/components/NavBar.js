import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import routes from '../routes'

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        {routes.map(({ path }) => (
          <NavLink to={path} key={path}>
            {path === '/' ? 'Home' : path.split('/')[1]}
          </NavLink>
        ))}
      </div>
    )
  }
}

export default NavBar
