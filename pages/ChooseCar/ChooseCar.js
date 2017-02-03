
var _ = require('../../utils/underscore.js');
var app = getApp();
Page({
  data: {
    Cars: {},
    CarYears: {},
    CarBrandName: "",
    CarBrandLogo: "",
    CarSerialName: "",
    CarSerialLogo: "",
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var id = options.id;
    var parm = {};
    parm.serialId = id;
    var url = app.AssembleUrl("basic/GetCarBasicList", parm);
    console.log(url);
    // url: 'https://test.webapi.cz.yiche.com/basic/GetCarBasicList?appid=gj&serialId=1561', 
    wx.request({
      url: url,
      success: function (res) {
        var list = res.data.data.list;
        var brandname = list[0].BrandName;
        var brandlogo = list[0].MasterBrandLogo;
        var SerialName = list[0].SerialName;
        var SerialLogo = list[0].SerialLogo;
        var groupBylist = _.groupBy(list, "YearType");
        var carYears=_.keys(groupBylist)
         groupBylist = _.toArray(groupBylist)

        that.setData({
          Cars: groupBylist,
          CarYears:carYears,
          CarBrandName: brandname,
          CarBrandLogo: brandlogo,
          CarSerialName: SerialName,
          CarSerialLogo: SerialLogo

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
  ToAddCar: function (event) {
    var id = event.currentTarget.dataset.hi;
    console.log(id);
    wx.navigateTo({ url: '/pages/ChooseCar/AddCar?id=' + id });

  },
})