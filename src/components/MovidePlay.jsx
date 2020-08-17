import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import './MovidePlay.scss'

const MovidePlay = ({match}) => {
  const player = useRef(null)
  const [src,setSrc] = useState('')
  useEffect(() => {
    axios.get(`/qq/mv/url?id=${match.params.id}`).then(res => {
      if (res.status === 200) {
        const arr = res.data.data[match.params.id]
        setSrc(arr[arr.length - 1])
      }
    })
  }, [match.params])
  return (
    <>
      {
        src && <ReactPlayer ref={player} url={src} controls className="video" pip/>
      }
    </>
  )
}

export default MovidePlay