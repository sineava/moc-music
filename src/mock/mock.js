const Mock = require('mockjs')
const avatar = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1596469091&di=dd6f2e9a44a5152487391aa41a2519eb&src=http://b-ssl.duitang.com/uploads/item/201508/13/20150813123542_fZ4JE.jpeg'
const album = 'https://www.melodynest.com/wp-content/uploads/2019/06/SPACE_album-mock.jpg'

// 轮播图Banner
const recommendBanner = Mock.mock('/recommend/banner',{
  "result": 100,
  "data|5": [{
    "type": Mock.Random.integer(10000,20000),
    "id": Mock.Random.integer(),
    "picUrl": avatar,
    "h5Url": avatar,
    "typeStr": "album"
  }]
})

// 推荐歌单
const recommendPlaylistU = Mock.mock('/recommend/playlist/u',{
  "result": 100,
  "data": {
    "list|12": [{
      "album_pic_mid": "",
      "content_id": 3651099683,
      "cover": album,
      "creator": "@id",
      "edge_mark": "",
      "id": 0,
      "is_dj": false,
      "is_vip|1": true,
      "jump_url": "",
      "listen_num": "@id",
      "pic_mid": "",
      "rcmdcontent": "",
      "rcmdtemplate": "编辑推荐",
      "rcmdtype": 0,
      "singerid": 0,
      "title": "「怀旧情怀」华语老歌的辉煌年代",
      "tjreport": "",
      "type": 10014,
      "username": "青青子衿"
    }],
    "count": 12
  }
})

// 获取歌单详情
const songList = Mock.mock(/\/songlist[\s\S]*?/, {
  "result": 100,
  "data": {
    "songlist|39": [{
      "albummid|1": [
        "003ofGzS3C23Ow",
        "003k49lM0oncN4",
        "003DFRzD192KKD",
        "000y5gq7449K9I",
        "000GDz8k03UOaI"
      ],
      "songmid|1": [
        "004W7UED0x3pqD",
        "000W9XxV1Pfohh",
        "004Z8Ihr0JIu5s",
        "004TXEXY2G2c7C",
        "001OyHbk2MSIi4"
      ]
    }]
  }
})

// 歌曲播放链接
const songUrls = Mock.mock(/\/song\/urls[\s\S]*?/, {
  "result": 100,
  "data": {
    "004W7UED0x3pqD": "http://122.226.161.16/amobile.music.tc.qq.com/C400000c72vs0aRony.m4a?guid=2796982635&vkey=87D3D619A0C26FF7C520DFFC1174B0C073C6CB76FB97E02C07DE00B4BA9BA65251E73A98A7AE7728AECC16F255F5B84D7CCC6F2FDDE1F8F3&uin=1899&fromtag=66",
    "000W9XxV1Pfohh": "http://122.226.161.16/amobile.music.tc.qq.com/C400000W9XxV1Pfohh.m4a?guid=2796982635&vkey=E0FA34D9409448D3E1B5587B690B9DD2382CC48313D5B60AEECA002BBFC14D65C801875C36B1A7434CED149DBE4E1BD1C2AD03B57D5C7B99&uin=1899&fromtag=66",
    "004Z8Ihr0JIu5s": "http://122.226.161.16/amobile.music.tc.qq.com/C4000012Ez0a1tFcOI.m4a?guid=2796982635&vkey=5B6E6B3DF2D9FE9783E9F2524AF946E875D6B80F8FBA04BA456D72198AE076CF955789D218B009CD56F68F64384567FF32D63A4EE5C02B28&uin=1899&fromtag=66",
    "004TXEXY2G2c7C": "http://122.226.161.16/amobile.music.tc.qq.com/C400003NikJo0a0uzm.m4a?guid=2796982635&vkey=4552282C4BA828840703C093ED6F886279CC80557F6A3C2A74EA7C36E7D3F05616E32518EB560853D509889C681F85060DE7D2A130AB308B&uin=1899&fromtag=66",
    "001OyHbk2MSIi4": "http://122.226.161.16/amobile.music.tc.qq.com/C400002AIxAT3HZwiA.m4a?guid=2796982635&vkey=F0936115E1318CF04243134BFB373FF1D1D233FB9BAB9A1A09C6CA664D8829CCDCBFA1A53301A0946380C89E1ADAC4F7418FCDD45F8CE07C&uin=1899&fromtag=66"
  }
})

export {
  recommendBanner,
  recommendPlaylistU,
  songList,
  songUrls
}