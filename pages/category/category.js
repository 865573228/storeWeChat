const app = getApp();
import {request} from '../../request/index.js'
Page({
  data: {
    navLists:[],
    contentLists:[],
    currentIndex:0, //被点击的左侧菜单
    scrollTop:0
  },
  Cates:[],
  clickMenu(e){
    // console.log('时间戳' + Date.now());
    const {index} = e.currentTarget.dataset;
    let contentLists = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      contentLists,
      scrollTop:0
    })
  },
  getCates(){
    request({url:'/categories'})
    .then(res=>{
      this.Cates = res.data.message;
      wx.setStorageSync('cates',{time:Date.now(),data:this.Cates})
      let navLists = this.Cates.map(v=>v.cat_name);
      let contentLists = this.Cates[0].children;
      this.setData({
        navLists,
        contentLists
      })

    })
  },
  onLoad: function (options) {
    /*0.web中本地存储和小程序的本地存储的区别
         1.web：localStorage.setItem('key','value')  localStorage.getItem('key')
          小程序:wx.setStorageSync('cates','key'); wx.getStorageSync('cates');
         2.存的时候有没有做类型转换
            web：不管存入的是什么类型的数据，最终都会先调用一下toString()，把数据变成了字符串，再存入进去
            小程序：不存在类型转换的这个操作，存什么类型的数据获取的时候就是什么类型。
      1.先判断一下本地存储中有没有旧的数据
        {time:Data.now().data:[...]}  
      2.没有旧数据 直接发送新请求
      3.有旧的数据 同时 旧的数据也没有过期 就使用本地存储中的旧数据即可
    */
  //  1.获取本地中的存储数据
    const Castes =wx.getStorageSync('cates');
    // 2.判断
    if(!Castes){
      console.log('没有数据发送数据');
      this.getCates()
    }else{
      // 有旧数据，定义过期时间
      if(Date.now() - Castes.time > 1000*10){
        console.log('过了10秒重新发数据');
        this.getCates()
      }else{
        // 可以使用旧数据
        console.log('可以使用旧数据');
        this.Cates = Castes.data;
        let navLists = this.Cates.map(v=>v.cat_name);
        let contentLists = this.Cates[0].children;
        this.setData({
          navLists,
          contentLists
        })
      }
    }
      
  }
})