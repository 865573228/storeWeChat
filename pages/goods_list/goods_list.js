// pages/goods_list/goods_list.js
Page({
  data: {
    goodsLists:[],
  },
  getGoodsLists(){
    var _this = this;
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      data: {},
      responseType: 'text',
      success: (res) => {
        console.log(res.data.message.goods);
        _this.setData({
          goodsLists:res.data.message.goods
        })
      }
    });
      
  },
  onLoad: function (options) {
    
    this.getGoodsLists()
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  }
})