import React, { useEffect, useState, Suspense } from 'react'
import { Layout} from 'antd'
import './App.scss'
import NavBar from './components/NavBar'
import { Route, Redirect, withRouter } from 'react-router-dom'
import musicIcon from './assets/icons/nav/music.png'
import PubSub from 'pubsub-js'
import axios from 'axios'
import PlayMusic from './components/PlayMusic'
import { Skeleton } from 'antd'
import MovidePlay from './components/MovidePlay'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import Search from './components/Search'
import Discovery from './views/Discovery'
import Recommend from './components/Recommend'

// 懒加载
const Home = React.lazy(() => import('./views/Home'))
const SongList = React.lazy(() => import('./components/SongList'))
const MusicList = React.lazy(() => import('./components/MusicList'))

function App(props) {
  const [active,setActive] = useState(false)
  const { Header, Content } = Layout
  const [songurl,setSongurl] = useState('')
  const [albummid,setAlbummid] = useState('')
  const [list,setList] = useState(JSON.parse(localStorage.getItem('songlist')) || null)
  useEffect(() => {
    if (list) {
      const [albummid,songmid] = list.shift()
      axios.get(`/qq/song/urls?id=${songmid}`).then(res => {
        if (res.status === 200) {
          setSongurl(res.data.data[songmid])
          setAlbummid(albummid)
        }
      })
    }
  }, [])
  useEffect(() => {
    // 发布订阅
    const token = PubSub.subscribe('play', (_, {albummid: album,songmid: song}) => {
      // 单击歌曲
      if (album && song) {
        axios.get(`/qq/song/urls?id=${song}`).then(res => {
          if (res.status === 200) {
            setSongurl(res.data.data[song])
            setAlbummid(album)
          }
        })
      } else {
        const newList = JSON.parse(localStorage.getItem('songlist'))
        setList(_ => {
          const [albummid,songmid] = newList.shift()
          axios.get(`/qq/song/urls?id=${songmid}`).then(res => {
            if (res.status === 200) {
              setSongurl(res.data.data[songmid])
              setAlbummid(albummid)
            }
          })
          return [...newList]
        })
      }
    })
    return function cleanup() {
      PubSub.unsubscribe(token)
    }
  },[list])
  const next = () => {
    localStorage.setItem('songlist', JSON.stringify(list))
    const [albummid,songmid] = list.shift()
    axios.get(`/qq/song/urls?id=${songmid}`).then(res => {
      if (res.status === 200) {
        setSongurl(res.data.data[songmid])
        setAlbummid(albummid)
      }
    })
  }
  const input = async e => {
    const val = e.target.value.trim()
    if (e.key === 'Enter' && val) {
      props.history.push(`/home/search/${val}`)
    }
    if (!val) {
      props.history.push(`/home`)
    }
  }
  return (
    <div className="App">
      <Layout className="layout">
        <Header className="header">
          <NavBar content={['Home','Discovery','Rooms']}/>
          <div className="icon-wrapper">
            <input type="text" name="key"
              className={`keyword ${active ? 'active' : ''}`} placeholder="搜索关键词" onKeyUp={input} />
            <div className="icon">
              <img className="music-icon" src={musicIcon} alt="music" onClick={() => setActive(!active)}/>
            </div>
          </div>
        </Header>
        <Content className="content" >
          <Suspense fallback={<Skeleton active/>}>
            {/* react-router-cache-route实现类似vue keep alive效果(注意副作用)  */}
            <CacheSwitch>
              <Redirect exact from="/" to="/home" />
              <CacheRoute exact path="/home" component={Home} />
              <Route path={`/home/songlist/:id`} component={SongList}/>
              <Route path={`/home/musiclist`} component={MusicList}/>
              <Route path={`/home/mv/:id`} component={MovidePlay}/>
              <Route path={`/home/search/:keyword`} component={Search}/>
              <Route path={`/home/recommend/:id`} component={Recommend}/>
              <Route path={`/discovery`} component={Discovery}/>
            </CacheSwitch>
          </Suspense>
        </Content>
      </Layout>
      {/* bottom play bar */}
      { songurl && <PlayMusic songurl={songurl} albummid={albummid} next={next}/> }
    </div>
  )
}

export default withRouter(App)
