import React from 'react'
import './PlayList.scss'
import { Link } from 'react-router-dom'
import playAll from '../assets/icons/control/play-all.png'
import axios from 'axios'
import PubSub from 'pubsub-js'

const PlayList = ({playlist,match}) => {
  const playTotal = async id => {
    const res = await axios.get(`/qq/songlist?id=${id}`)
    if (res.status === 200) {
      console.log(res.data.data.songlist)
      const list = res.data.data.songlist
        .filter(song => song.albummid)
        .map(song => [song.albummid, song.songmid,song.songname,song.singer[0].name])
      console.log(list)
      localStorage.setItem('songlist', JSON.stringify(list))
      // 发布
      PubSub.publish('play', {})
    }
  }
  return (
    <div className="playlist">
      <div className="desc-wrapper">
        <span className="left">推荐歌单</span>
      </div>
      <div className="playlist-wrapper">
        <div className="wrapper">
          { playlist.map((play,index) => (
            <div key={`play-list-${index}`} className="playlist-item">
              <div className='playlist-avatar' style={{backgroundImage: `url(${play.cover})`}}>
                <Link to={`${match.url}/songlist/${play.content_id}`}></Link>
                <div className="btn-wrapper" onClick={() => playTotal(play.content_id)}>
                  <img src={playAll} alt='全部播放' style={{height: '100%'}} />
                </div>
              </div>
              <span className="desc">{play.title}</span>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PlayList