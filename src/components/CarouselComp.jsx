import React from 'react'
import { Carousel } from 'antd'
import './CarouselComp.scss'

const CarouselComp = ({banners}) => {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center'
  }
  return (
    <div className="carousel-wrapper">
      <div className="carousel-comp">
        <Carousel className="carousel">
          { banners.map(banner => {
            return (
              <div key={banner.id}>
                <h3 style={contentStyle}>
                  <img src={banner.picUrl} alt="banner" />
                </h3>
              </div>
            )
          })}
        </Carousel>
      </div>
    </div>
    
  )
}

export default CarouselComp