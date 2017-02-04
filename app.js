//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    /** 初始化基本信息 */
    this.Init();
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
  globalData:{
    userInfo:null,
    encryptedData:null,
    WebApiUrl:"https://test.webapi.cz.yiche.com/",
    WebAppId:"gj",
    WxAdocAppID:"wxcd6a30ff7b23b577"
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
  Init:function(){
    var that =this;
    //调用登录接口
    wx.login({
      success: function(res) {
        if (res.code) {          
          //调用getUserInfo接口获取加密data
          wx.getUserInfo({
            success: function(userRes) {
              var submiturl = that.AssembleUrl('WxAdoc/EncryptedData',{})
              var wxAppid = that.globalData.WxAdocAppID;
              wx.request({
                url:submiturl, 
                method:'POST',
                data: {
                  key: wxAppid ,
                  code: res.code,
                  encryptedData:userRes.encryptedData,
                  iv:userRes.iv
                },
                success: function (reqRes) {
                  //console.log(reqRes.data.data.list[0].openId);
                  if(reqRes.data.returncode===0){
                    var dataInfo = reqRes.data.data.list[0];
                    var openID = dataInfo.openId
                    if(openID){
                      /** 缓存openID */
                      wx.setStorageSync('openID', openID)
                      
                      /** 获取userID */
                      submiturl = that.AssembleUrl('user/GetUserByAccount',{})
                      wx.request({
                        url:submiturl, 
                        method:'POST',
                        data: {
                          Account: openID ,
                          Phone: '',
                          UnionId:dataInfo.unionId,
                          UserId:wxAppid,
                          NickName:dataInfo.nickName,
                          HeadImgUrl:dataInfo.avatarUrl,
                          Sex:dataInfo.gender,
                          City:dataInfo.city,
                          Province:dataInfo.province,
                          Country:dataInfo.country
                        },
                        success: function (reqRes2) {
                          //console.log(reqRes2.data.returncode);
                          if(reqRes2.data.returncode===0){
                            // 缓存userid、CusUserID、CusYCUserID、UserName、Phone 
                            var dataInfo2 = reqRes2.data.data.list[0];
                            wx.setStorageSync('Phone', dataInfo2.Phone)
                            wx.setStorageSync('UserName', dataInfo2.UserName)
                            wx.setStorageSync('CusUserID', dataInfo2.CusUserID)
                            wx.setStorageSync('CusYCUserID', dataInfo2.CusYCUserID)
                          }
                          /**console.log(wx.getStorageSync('Phone'));
                          console.log(wx.getStorageSync('UserName'));
                          console.log(wx.getStorageSync('CusUserID'));
                          console.log(wx.getStorageSync('CusYCUserID'));
                          */
                        }
                      });
                       
                    }
                  }
                  else{
                    console.log(reqRes.data.message)
                  }
                },
                fail:function(failRes){
                  console.log(failRes)
                },
                complete: function(completeRes) {
                  console.log(completeRes)
                }
              });
            }
          });
        }
        else {

        }
      }
    });
  }
})