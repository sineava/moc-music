import React from 'react'
import { Carousel } from 'antd'
import './CarouselComp.scss'

const CarouselComp = ({banners}) => {
  const contentStyle = {
    className: 'carousel-item',
    height: '160px'
  }
  return (
    <div className="carousel-wrapper">
      <div className="carousel-comp">
        <Carousel className="carousel" autoplay>
          { banners && banners.map(banner => {
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