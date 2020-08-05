const app = getApp();
import {request} from '../../request/index.js'
Page({
  data: {
    bannerList:[],
    navLists:[],
    foolLists:[],
  },
  //options(Object)
  onLoad: function(options){
    // 轮播图
    request({url:'/home/swiperdata'})
    .then(res=>{
      this.setData({
        bannerList:res.data.message
      })
    }),
    // nav
    request({url:'/home/catitems'})
    .then(res=>{
      this.setData({
        navLists:res.data.message
      })
    }),
    // 楼层
    request({url:'/home/floordata'})
    .then(res=>{
      this.setData({
        foolLists:res.data.message
      })
    })
  }
});