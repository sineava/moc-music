import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CarouselComp from '../components/CarouselComp'
import PlayList from '../components/PlayList'

// match为路由
const Home = ({match}) => {
  const [banners,setBanners] = useState([])
  const [playlist,setPlaylist] = useState([])
  useEffect(() => {
    const getRecommendBanner = () => (axios.get('/qq/recommend/banner'))
    const getRecommendPlaylistU = () => (axios.get('/qq/recommend/playlist/u'))
    axios.all([getRecommendBanner(), getRecommendPlaylistU()])
    .then(axios.spread((recommendBanner, recommendPlaylistU) => {
      if (recommendBanner.status === 200 && recommendPlaylistU.status === 200) {
        setBanners(recommendBanner.data.data)
        const lists = recommendPlaylistU.data.data.list
        setPlaylist(lists)
      }
    }))
  },[])
  return (
    <>
      <CarouselComp banners={banners}/>
      <PlayList match={match} playlist={playlist}/>
    </>
  )
}

export default Home