import React from 'react'
import './NavBar.scss'
import { NavLink } from 'react-router-dom'

const NavBar = ({content}) => {
  return (
    <ul className="navbar">
      {content.map(nav => {
        const path = nav.toLowerCase()
        return (
          <li key={nav} className="navbar-item">
            <NavLink to={`/${path}`} activeClassName="selected">{nav}</NavLink >
          </li>
        )
      })}
    </ul>
  )
}

export default NavBar