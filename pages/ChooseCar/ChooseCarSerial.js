
var _ = require('../../utils/underscore.js');
var app = getApp();
Page({
  data: {
    CarSerials: {},
    CarBrandName: "",
    CarBrandLogo: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;
    var parm = {};
    parm.masterBrandId = options.id;
    var url = app.AssembleUrl("basic/GetSerialList", parm);
    console.log(url);
    // url: 'https://test.webapi.cz.yiche.com/basic/GetSerialList?appid=gj&masterBrandId=9', 
    wx.request({
      url: url,
      success: function (res) {
        var list = res.data.data.list;
        var brandname = list[0].BrandName;
        var brandlogo = list[0].MasterBrandLogo;
        that.setData({
          CarSerials: list,
          CarBrandName: brandname,
          CarBrandLogo: brandlogo,
        })
        that.update()
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //去選車款
  ToCar: function (event) {
    var id = event.currentTarget.dataset.hi;
    console.log(id);
    wx.navigateTo({ url: '/pages/ChooseCar/ChooseCar?id=' + id });

  },
})