//index.js
//获取应用实例
var app = getApp()
Page({ 
 data: {
    background: ['green', 'red', 'yellow'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    motto: 'Hello World wechat1',
    userInfo: {},
    cusUserID:12020,
    UserCarInfos:{}
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //获取用户车辆信息
  LoadUserCarInfo: function (id) {
    console.log('LoadUserCarInfo')
      var that = this
    wx.request({
      url: 'https://test.webapi.cz.yiche.com/user/GetCustomCarByCusUserID?appid=gj&cusUserID='+id,     
      success: function (res) {
        console.log(res.data)       
        that.setData({
          UserCarInfos: res.data.data.list
        })
         that.update()
      }
    })
  },
  //跳转到添加车辆
ToAddCar:function(){


},
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo,
        cusUserID:12020
      })
      that.update()
    });
    this.LoadUserCarInfo(this.data.cusUserID);
    
  }
  
})
