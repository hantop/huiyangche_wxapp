   var _ = require('../../utils/underscore.js');
  var app = getApp(); 
Page({
  data:{
   
     CarBrands:{},
     FirstWord:[],
     toView: 'A'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var url =app.AssembleUrl("basic/GetBrandList");     
      wx.request({
      url: url,     
      success: function (res) {           
       var list= _.groupBy(res.data.data.list, "FirstLetter" );   
        //list =_.toArray(list);   
        that.setData({
          CarBrands: _.toArray(list),
          FirstWord:_.keys(list)
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
  ToCarSerial:function(event){
    var id= event.currentTarget.dataset.hi;
    console.log(id);
    wx.navigateTo({url:'/pages/ChooseCar/ChooseCarSerial?id='+id});

  },
    //移动到锚点
  goHash(e) {
    var that = this;
    let hash = e.currentTarget.dataset.hash
    console.log(hash);
    that.setData({
      toView: hash
    })
     that.update();
  }
})