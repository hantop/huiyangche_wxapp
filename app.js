//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              that.globalData.encryptedData = res.encryptData;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  //配置信息
  globalData:{
    userInfo:null,
    encryptedData:null,
    WebApiUrl:"https://test.webapi.cz.yiche.com/",
    WebAppId:"gj"
  },
  //组装webapi的Url
  AssembleUrl:function(Methodname,obj){
     
    var WebApiurl = this.globalData.WebApiUrl
    var appid = this.globalData.WebAppId;
    var url = WebApiurl + Methodname + "?appid=" + appid;
    if (typeof (obj) != "undefined") {
      for (var Key in obj) {
        url += '&' + '' + Key + '=' + obj[Key] + '';
      }
    }
    return url;
  },
})



