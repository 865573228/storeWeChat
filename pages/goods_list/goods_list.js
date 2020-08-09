//Page Object
Page({
  data: {
    navLists:['综合','销量','价格'],
    currentIndex:0,
    index:0
  },
  onLoad: function(options) {
    console.log(options);
  },
  // 点击tab切换时触发
changeNav(e){
  console.log(e);
  const tabIndex = e.currentTarget.dataset.index;
  this.setData({
    currentIndex:tabIndex
  })
},
// 滑动wiper触发
swiperChange(e){
  console.log(e);
  if('touch' === e.detail.source){
    this.setData({
      currentIndex:e.detail.current
    })
  }
}
});
  