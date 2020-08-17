import React, { useState } from 'react'
import './MusicControl.scss'
import prevImg from '../assets/icons/control/prev.png'
import nextImg from '../assets/icons/control/next.png'
import playIcon from '../assets/icons/control/play.png'
import pauseIcon from '../assets/icons/control/pause.png'
import circleIcon from '../assets/icons/control/circle-play.png'
import circleActiveIcon from '../assets/icons/control/circle-play-active.png'
import randomIcon from '../assets/icons/control/random-play.png'
import randomAtiveIcon from '../assets/icons/control/random-play-active.png'

const MusicControl = ({status,control,next,playType}) => {
  const [type,setType] = useState('')
  const controlType = newtype => {
    if (type === newtype) {
      setType('')
      playType('')
    } else {
      setType(newtype)
      playType(newtype)
    }
  }
  return (
    <div className="control-wrapper">
      <div className="circle">
        <img src={(type && type) === 'circle' ? circleActiveIcon : circleIcon} alt="循环播放" onClick={() => controlType('circle')}/>
      </div>
      <div className="prev">
        <img src={prevImg} alt="上一首"/>
      </div>
      <div className="play-pause">
          {
            !status
            ? <img className='control' src={playIcon} alt="control" onClick={control}/>
            : <img className='control' src={pauseIcon} alt="control" onClick={control}/>
          }
      </div>
      <div className="next">
        <img src={nextImg} alt="下一首" onClick={next}/>
      </div>
      <div className="random">
        <img src={(type && type) === 'random' ? randomAtiveIcon : randomIcon} alt="随机播放" onClick={() => controlType('random')}/>
      </div>
    </div>
  )
}

export default MusicControl