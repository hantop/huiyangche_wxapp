Page({
  data:{
    text:"Page querybrand",
    CarBrands:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
      wx.request({
      url: 'https://test.webapi.cz.yiche.com/basic/GetBrandList?appid=gj',     
      success: function (res) {        
        that.setData({
          CarBrands: res.data.data.list
        })
         that.update()
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //跳转到车系选择页
  ToCarSerial:function(d){
    console.log(d);
    wx.navigateTo({url:'/pages/queryserial/queryserial?id=9'});

  }
})