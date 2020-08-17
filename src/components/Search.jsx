import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.scss'
import PubSub from 'pubsub-js'
import { Spin } from 'antd'

const Search = ({match}) => {
  const [list,setList] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/qq/search/quick?key=${match.params.keyword}`)
      setList(res.data.data)
    }
    fetchData()
  }, [match.params.keyword])
  const playMusic = async mid => {
    // 获取专辑mid
    const res = await axios.get(`/qq/song?songmid=${mid}`)
    PubSub.publish('play', {albummid: res.data.data.track_info.album.mid,songmid: mid})
  }
  return (
    <div className="search">
      {/* <span>单曲</span> */}
      { list ?
        <ul>
          {
            list.song.itemlist.map(song => 
              <li key={song.id} onClick={() => playMusic(song.mid)}>
                <div className="songname">{song.name}</div>
                <div className="singer">
                  <span className="icon">SQ</span>
                  {song.singer}
                </div>
              </li>
            )
          }
        </ul>
        : <Spin />
      }
    </div>
  )
}

export default Search