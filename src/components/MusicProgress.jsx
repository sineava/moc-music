import React, { useRef, useState } from 'react'
import './MusicProgress.scss'

const MusicProgress = ({playedPercent,playedSeconds,duration = 0, handleCurrent}) => {
  const progress = useRef(null)
  const [width,setWidth] = useState(0)
  const [prev,setPrev] = useState(0)
  const parse = num => {
    const r1 = Math.floor(num / 60)
    const r2 = Math.floor(num % 60)
    const minute = r1 < 10 ? '0' + r1 : r1
    const seconds = r2 < 10 ? '0' + r2 : r2
    return `${minute}:${seconds}`
  }
  const touchStart = () => {
    setWidth(progress.current.offsetWidth)
  }
  // 开始点击
  const touchMove = e => {
    if (e.changedTouches && e.changedTouches.length) {
      const pageX = e.changedTouches[0].pageX
      let len = 0
      if (pageX <= 20) len = 0
      if (pageX >= width - 20) len = width - 40
      if (pageX > 20 && pageX < width - 20) {
        len = pageX - 20
      }
      const percent = Math.floor(len * 100 /(width - 40)) / 100
      if (prev !== percent) {
        handleCurrent(percent)
        // 避免未改变就重复调用
        setPrev(percent)
      }
    }
  }
  return (
    <div className="progress-wrap music-progress" ref={progress}>
      <div className="dot" style={{left: `calc(${playedPercent}% - 7.5px)`}} onTouchStart={touchStart} onTouchMove={touchMove}></div>
      <div className="progress-bar music-progress"></div>
      <div className="progress-bar music-buffered" style={{width: `${playedPercent}%`}}></div>
      <div className="info">
        <div className="played">
          {parse(playedSeconds)}
        </div>
        <div className="duration">
          {parse(duration)}
        </div>
      </div>
    </div>
  )
}

export default MusicProgress