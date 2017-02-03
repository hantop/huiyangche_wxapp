var pageObject = {
  data: {
    orderID: '',
    infoMess:''
  },
  
  //用户名和密码输入框事件
  bindOrderIDInput:function(e){
    this.setData({
      orderID:e.detail.value
    })
  },
  bindButtonTap: function(e) {
    var that = this;
    var orderid=that.data.orderID;
    if(orderid.length == 0){
      that.setData({
        infoMess:'温馨提示：订单号不能为空！',
      })
      return false;
    }
    else{
      that.setData({
        infoMess:'',
      })
    }
    //console.log(orderid)
    wx.login({
      success: function(res) {
        //console.log(res.code)
        //console.log('https://test.webapi.cz.yiche.com/WxAdocPay/Create?appid=gj&key=Test&code='+res.code+'&orderID='+orderid)     
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.webapi.cz.yiche.com/WxAdocPay/Create?appid=gj&key=Test&code='+res.code+'&orderID='+orderid,     
            success: function (reqRes) {  
              //console.log(reqRes.data)
              if(reqRes.data.returncode===0){
                var dt = reqRes.data.data.list[0]
                /**呼起 */
                wx.requestPayment({
                  'timeStamp': dt.timestamp,
                  'nonceStr':dt.nonceStr,
                  'package': dt.package,
                  'signType': 'MD5',
                  'paySign': dt.paySign,
                  'success':function(sRes){
                  },
                  'fail':function(sRes){
                  }
                })
                /**呼起 */
              }
              else{
                that.setData({
                  infoMess:reqRes.data.message,
                })
              }
            },
            fail:function(failRes){
              that.setData({
                infoMess:failRes.data,
              })
            },
            complete: function(completeRes) {
              console.log(completeRes)
            }
          })
        } else {
          that.setData({
            infoMess:'获取用户登录态失败！' + res.errMsg,
          })
        }
      }
    });
  },
}

Page(pageObject)