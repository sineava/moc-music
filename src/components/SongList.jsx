import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './SongList.scss'
import { Spin } from 'antd'
import PubSub from 'pubsub-js'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import videoIcon from '../assets/icons/control/video-camera.png'
import { Link } from 'react-router-dom'

BScroll.use(Pullup)

const SongList = ({ match }) => {
  const wrapper = useRef(null)
  const [songList, setSongList] = useState([])
  useEffect(() => {
    let arrs = []
    const loadingData = async () => {
      const res = await axios.get(`/qq/songlist?id=${match.params.id}`)
      if (res.status === 200) {
        const songs = res.data.data.songlist
          .filter(song => song.albummid)
          .map(song => [song.albummid, song.songmid,song.vid,song.songname])
        const arr = songs.splice(0, 20)
        setSongList(arr)
        arrs = arr
        const bs = new BScroll(wrapper.current, {
          click: true,
          scrollY: true,
          scrollbar: false,
          bounce: {
            top: false
          },
          mouseWheel: true,
          pullUpLoad: {
            threshold: -30
          }
        })
        bs.on('pullingUp', function () {
          if (songs.length !== 0) {
            arrs = [...arrs, ...songs.splice(0, 20)]
            setSongList([...arrs])
            // 时间不要太长,否则会有卡顿感
            setTimeout(() => {
              this.finishPullUp()
              this.refresh()
            })
          }
        })
      }
    }
    loadingData()
  }, [match.params.id])
  function loadMusic(albummid, songmid,vid,songname) {
    PubSub.publish('play', {albummid,songmid,vid,songname})
  }
  return (
    <div className="songlist wrapper" ref={wrapper}>
      <ul className="content">
        {songList.length === 0
          ? <Spin size="large" />
          : songList.map((mid, index) => {
            const [albummid, songmid, vid, songname] = mid
            return (
              <li key={`songId-${index}`} className="album">
                {
                  vid && (
                    <Link className="link" to={`/home/mv/${vid}`}>
                      <img className="video" src={videoIcon} alt={vid} />
                    </Link>
                  )
                }
                <img className="cover" src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg`} alt="cover" onClick={() => { loadMusic(albummid,songmid,vid,songname) }} />
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default SongList