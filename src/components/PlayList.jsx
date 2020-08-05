import React from 'react'
import './PlayList.scss'
import { Link } from 'react-router-dom'

const PlayList = ({playlist,match}) => {
  return (
    <div className="playlist">
      <div className="desc-wrapper">
        <span className="left">Curated Just For You</span>
        <span className="right">View all</span>
      </div>
      <div className="playlist-wrapper">
        { playlist.map((play,index) => (
          <div key={`play-list-${index}`} className="playlist-item">
            <div className='playlist-avatar' style={{backgroundImage: `url(${play.cover})`}}>
              <Link to={`${match.url}/${play.content_id}`}></Link>
            </div>
            <span className="desc">{play.title}</span>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default PlayList