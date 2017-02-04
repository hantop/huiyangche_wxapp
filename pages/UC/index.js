

var app = getApp();
Page({
  data:{
   userInfo:{}
    
  },
  onLoad:function(){
     var that = this
  	//调用应用实例的方法获取全局数据
    console.log("sssdjsdjfsdj")
    app.getUserInfo(function(userInfo){
      console.log(userInfo);
        that.setData({
        userInfo:userInfo,      
      })
      that.update()
    });
   
  }

  
})