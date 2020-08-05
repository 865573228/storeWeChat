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
    console.log('时间戳' + Date.now());
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
    
    const Castes =wx.getStorageSync('cates');
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