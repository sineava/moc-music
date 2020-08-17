import React, { useEffect, useRef } from 'react'
import 'echarts-wordcloud'
import echarts from 'echarts'
import { withRouter } from 'react-router-dom'

const Discovery = (props) => {
  const wordcloud = useRef(null)
  useEffect(() => {
    var myChart = echarts.init(wordcloud.current)
    var maskImage = new Image()
    //重点：云彩图片的base64码
    maskImage.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';

    maskImage.onload = function () {
      myChart.setOption({
        backgroundColor: '#F8F9FD',
        series: [{
          type: 'wordCloud',
          gridSize: 1,
          sizeRange: [12, 55],
          rotationRange: [-45, 0, 45, 90],
          maskImage: maskImage,
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) + ')'
              }
            }
          },
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          width: '100%',
          height: '100%',
          data: [
            {
              name: '热门',
              value: 500
            }, {
              name: '国语',
              value: 320
            }, {
              name: '粤语',
              value: 300
            }, {
              name: '流行',
              value: 250
            }, {
              name: '轻音乐',
              value: 200
            }, {
              name: 'ACG',
              value: 300
            }, {
              name: '网络歌曲',
              value: 300
            }, {
              name: 'KTV热歌',
              value: 450
            }, {
              name: '伤感',
              value: 240
            }, {
              name: '安静',
              value: 240
            }, {
              name: '睡前',
              value: 300
            }, {
              name: '学习',
              value: 350
            }, {
              name: '运动',
              value: 270
            }, {
              name: '开车',
              value: 350
            }, {
              name: '约会',
              value: 240
            }, {
              name: '咖啡馆',
              value: 350
            }, {
              name: '英语',
              value: 290
            }, {
              name: '蓝调',
              value: 400
            }, {
              name: '影视',
              value: 320
            }, {
              name: '城市',
              value: 220
            }]
        }]
      })
      myChart.on('click', function (param) {
        const hobbies = [
          {id: 10000000,content: '热门'},
          {id: 165,content: '国语'},
          {id: 166,content: '粤语'},
          {id: 6,content: '流行'},
          {id: 15,content: '轻音乐'},
          {id: 39,content: 'ACG'},
          {id: 146,content: '网络歌曲'},
          {id: 141,content: 'KTV热歌'},
          {id: 52,content: '伤感'},
          {id: 122,content: '安静'},
          {id: 78,content: '睡前'},
          {id: 101,content: '学习'},
          {id: 99,content: '运动'},
          {id: 85,content: '开车'},
          {id: 76,content: '约会'},
          {id: 223,content: '咖啡馆'},
          {id: 167,content: '英语'},
          {id: 22,content: '蓝调'},
          {id: 133,content: '影视'},
          {id: 196,content: '城市'}
        ]
        const id = hobbies.filter(hobbie => hobbie.content === param.name)[0].id
        props.history.push(`/home/recommend/${id}`)
      })
    }
  }, [props.history])
  return (
    <div>
      <div ref={wordcloud} style={{ height: 200 }}></div>
    </div>
  )
}

export default withRouter(Discovery)