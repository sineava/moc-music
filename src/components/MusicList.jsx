import React from 'react'
import { Link } from 'react-router-dom'
import './MusicList.scss'

const MusicList = ({location}) => {
  return (
    <div className="musiclist-wrapper">
      { location.state.map((play,index) => (
        <div key={`play-list-${index}`} className="playlist-item">
          <div className='playlist-avatar' style={{backgroundImage: `url(${play.cover})`}}>
            <Link to={`/home/songlist/${play.content_id}`}></Link>
          </div>
          <span className="desc">{play.title}</span>
        </div>
        ))
      }
    </div>
  )
}

export default MusicList