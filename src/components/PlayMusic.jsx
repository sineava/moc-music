import React, { useState, useRef } from 'react'
import './PlayMusic.scss'
import controlPlayImg from '../assets/icons/control/play.png'
import controlPauseImg from '../assets/icons/control/pause.png'
import musicListImg from '../assets/icons/control/music-list.png'
import ReactPlayer from 'react-player'
import WaterWave from 'water-wave'
import 'water-wave/style.css'
import TopBar from './TopBar'
import Effect from './Effect'
import MusicProgress from './MusicProgress'
import MusicControl from './MusicControl'

const PlayMusic = ({ songurl, albummid, next }) => {
  const player = useRef(null)
  const [status, setStatus] = useState(false)
  const [touch, setTouch] = useState(false)
  const [duration, setDuration] = useState(0)
  const [loop,setLoop] = useState(false)
  const [progress, setProgress] = useState({
    playedPercent: 0,
    playedSeconds: 0
  })
  const control = () => {
    setStatus(!status)
  }
  const play = () => {
    setStatus(true)
  }
  const pause = () => {
    setStatus(false)
  }
  const apse = () => {
    setTouch(false)
  }
  const handleProgress = ({ played, playedSeconds }) => {
    setProgress({
      playedPercent: played * 100,
      playedSeconds
    })
  }
  const ready = () => {
    setDuration(player.current.getDuration())
  }
  const handleCurrent = curr => {
    player.current.seekTo(curr)
  }
  const playnext = () => {
    next()
    play()
  }
  // 顺序播放(默认)/随机播放/单曲循环
  const playType = type => {
    if (type === 'circle') {
      setLoop(true)
    } else {
      setLoop(false)
    }
  }
  return (
    <div className={`music-wrapper ${touch ? 'touch' : ''}`} >
      {/* 音频 */}
      <ReactPlayer url={songurl} playing={status} className="player" onPlay={play} onPause={pause}
        onProgress={handleProgress} ref={player} onReady={ready} onEnded={playnext} loop={loop}/>
      {/* 收起显示 */}
      <div className="pack">
        <div className="left-wrapper">
          {
            albummid &&
            <img src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg`} alt="avatar" className="avatar" onClick={() => setTouch(true)} />
          }
        </div>
        <div className="right-wrapper">
          {
            !status
              ? <img src={controlPlayImg} alt="control" className='control-btn control-btn-play' onClick={control} />
              : <img src={controlPauseImg} alt="control" className='control-btn control-btn-pause' onClick={control} />
          }
          <img src={musicListImg} alt="control" className='playlist' />
        </div>
        <WaterWave color="#fff" duration={1000} effect="ripple" />
      </div>
      {/* 展开显示 */}
      <div className="unfold">
        <TopBar apse={apse} songurl={songurl}/>
        <div className="content">
          {/* 音乐播放鲸鱼特效 */}
          <Effect albummid={albummid} />
          {/* progress: 播放百分比,duration: 音频时长,playedSeconds:已播放秒数 */}
          <MusicProgress {...progress} duration={duration} handleCurrent={handleCurrent} />
          {/* 音乐播放/暂停/上一首/下一首 */}
          <MusicControl status={status} control={control} next={next} playType={playType}/>
        </div>
      </div>
    </div>
  )
}

export default PlayMusic;