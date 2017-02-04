
var _ = require('../../utils/underscore.js');
var app = getApp();
Page({
  data: {
    Cars: {},
    open: false,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var id = options.id;
    var parm = {};
    parm.carIds = id;
    var url = app.AssembleUrl("basic/GetCar", parm);

    wx.request({
      url: url,
      success: function (res) {
        var car = res.data.data.list[0];
        that.setData({
          Cars: car
        });
      }
    })

  },
  //添加用户车辆信息
  AddCar: function (event) {
    var that = this;


  },
  //显示汽车其他属性的block 点击展开 点击隐藏
  widgetsToggle: function (e) {
    console.log(this.data.open);
    var curopen = !this.data.open;
    console.log(curopen);
    this.setData({
      open: curopen
    });
  },
})