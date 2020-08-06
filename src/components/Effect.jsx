import React from 'react'
import './Effect.scss'
import { wrapper } from '../util/util'

export default class Effect extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }
  componentDidMount() {
    const canvas = this.canvas.current
    wrapper(canvas)
  }
  render() {
    return (
      <div className="debut">
        <canvas className="music-cover-background" ref={this.canvas}>your brower does not support canvas</canvas>
        <div className="music-cover">
          <img src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.props.albummid}.jpg`} className="music-cover-image" alt='cover'></img>
        </div>
      </div>
    )
  }
}
