var pageObject = {
  onShareAppMessage: function () {
    return {
      title: '分享测试页',
      desc: '分享测试页',
      path: '/bizmall/pay'
    }
  }
}

Page(pageObject)