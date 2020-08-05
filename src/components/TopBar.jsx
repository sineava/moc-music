import React from 'react'
import collapse from '../assets/icons/control/collapse.png'
import './TopBar.scss'

const NavBar = ({apse}) => {
  return (
    <div className="collapse">
      <img src={collapse} alt="collapse" onClick={apse}/>
    </div>
  )
}

export default NavBar