import React from 'react'
import collapse from '../assets/icons/control/collapse.png'
import './TopBar.scss'
import downloadIcon from '../assets/icons/control/download.png'

const NavBar = ({apse,songurl}) => {
  return (
    <div className="collapse">
      <img src={collapse} alt="collapse" onClick={apse}/>
      {/* 下载必须是同源或者解决跨域,否则会打开而不是下载 */}
      <a href={songurl.replace('http://122.226.161.16','/download')} download>
        <img src={downloadIcon} alt="download" />
      </a>
    </div>
  )
}

export default NavBar