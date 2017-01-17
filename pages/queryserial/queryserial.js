Page({
  data:{
    text:"Page queryserial",
    CarSerials:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     // 页面初始化 options为页面跳转所带来的参数
    var that = this;
      wx.request({
      url: 'https://test.webapi.cz.yiche.com/basic/GetSerialList?appid=gj&masterBrandId=9',     
      success: function (res) {        
        that.setData({
          CarSerials: res.data.data.list
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
  }
})