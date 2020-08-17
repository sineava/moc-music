import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Recommend.scss'
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js'
import playAll from '../assets/icons/control/play-all.png'

const Recommend = ({match}) => {
  const [list,setList] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/qq/songlist/list?category=${match.params.id}`)
      setList(res.data.data.list)
    }
    fetchData()
  }, [match.params.id])
  const playTotal = async id => {
    const res = await axios.get(`/qq/songlist?id=${id}`)
    if (res.status === 200) {
      const list = res.data.data.songlist
        .filter(song => song.albummid)
        .map(song => [song.albummid, song.songmid,song.vid])
      localStorage.setItem('songlist', JSON.stringify(list))
      // 发布
      PubSub.publish('play', {})
    }
  }
  return (
    <ul className="recommend">
      {
        list && list.map(item => 
        <li key={item.dissid} className="recommend-item">
          <div className="wrapper">
            <Link className="link" to={`/home/songlist/${item.dissid}`}>
              <img src={item.imgurl} alt="cover"/>
            </Link>
            <div className="btn-wrapper" onClick={() => playTotal(item.dissid)}>
              <img src={playAll} alt='全部播放' style={{height: '100%'}}  />
            </div>
          </div>
          <div className="content">{item.dissname}</div>
        </li>)
      }
    </ul>
  )
}

export default Recommend