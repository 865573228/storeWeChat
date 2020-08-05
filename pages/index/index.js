const app = getApp();
import {request} from '../../request/index.js'
Page({
  data: {
    bannerList:[],

  },
  //options(Object)
  onLoad: function(options){
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     console.log(result)
    //     this.setData({
    //       bannerList:result.data.message
    //     })
    //   }
    // });
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(res=>{
      this.setData({
        bannerList:res.data.message
      })
    })
  }
});