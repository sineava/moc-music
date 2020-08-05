import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import './SongList.scss'
import { Spin } from 'antd'
import PubSub from 'pubsub-js'

const SongList = ({match}) => {
  const [songList,setSongList] = useState([])
  useEffect(() => {
    if (match.params.id !== 'album') {
      axios.get(`/songlist?id=${match.params.id}`)
      .then(res => {
        if (res.status === 200) {
          const ids= res.data.data.songlist.map(song => [song.albummid,song.songmid]).slice(0,20)
          setSongList(ids)
        }
      })
    }
  },[match.params.id])
  function loadMusic(songmid,albummid) {
    PubSub.publish('play', {songmid,albummid})
  }
  return (
    <div className="songlist">
      {songList.length === 0
        ? <Spin size="large"/>
        : songList.map((mid,index) => 
        {
          const [albummid,songmid] = mid
          return (
            <div key={`songId-${index}`}
              className="album"
              data-aos="fade-up"
              data-aos-duration="3000"
              data-aos-delay={`${500 * index}`}>
              <img className="cover" src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg`} alt="cover" onClick={() => {loadMusic(songmid,albummid)}}/>
            </div>  
          )
        })}
    </div>
  )
}

export default SongList