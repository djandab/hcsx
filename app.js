//app.js
let util = require('./utils/util');
let api = require('./utils/api');

App({
  data: {
    uid: '',
  },
  onLaunch: function(e) {
    // this.getUserInfo();
    this.updateChage();
    
  },
  onShow: function(options) {
    let invite = options.query.invite;
    // 获取分享链接中的邀请码
    wx.setStorageSync('invite', invite)

    let that = this;
    if (options.query.pid) {
      that.globalData.pid = options.query.pid;
    }

    if (options.query.scene) {
      const scene = decodeURIComponent(options.query.scene)
      console.log(scene)
      console.log(options)
      let split = scene.split('&')[1];
      let pid = split.split('=')[1];
    
      // that.globalData.pid = pid;

      let arr = split.split('=')

      if (arr[0] == 'pid') {
        that.globalData.pid = pid;
      }
      
      // let goods_id = split
      // let group_id = pid
      
    }
    // console.log('是否有监听')
    // Do something when show.
  },

  globalData: {
    pid: '', // 用户上级id
    url: '',
    userInfo: '',
    userlogin: '',
    code:'',
  },
  //控制授权登入
  userlogin: function(page) {},
  getUserInfo: function() {
    let that = this;
    // return new Promise(function (resolve, reject) {
    //   util.request(api.Detail, {}, 'post').then(function (res) {
    //     if (res.success) {
    //       wx.setStorageSync('appkey', res.list.appkey);
    //       that.globalData.userInfo = res.list;
    //     } else {
    //       // util.showErrorToast(res.info);
    //     }
    //   })
    // });

    // return new Promise(function (resolve, reject) {
    //   wx.login({
    //     success: function (res) {
    //       var code = res.code;  //获取code
    //       // console.log(res)
    //       util.request(api.Checkauth, { code : code }, 'post').then(function (res) {
    //         if (res.success) {
    //           wx.setStorageSync('appkey', res.list.appkey);
    //           that.globalData.userInfo = res.list;

    //           if (res.list.mobile){
    //           }else{
    //             //检查是否绑定过手机号
    //             setTimeout(function(){
    //                 wx.redirectTo({
    //                   url: '/pages/auth/mobile?have=1'
    //                 })
    //             },500)
    //           }
    //         } else {
    //           util.showErrorToast(res.info);
    //           if (res.info == '登录异常') {
    //             wx.redirectTo({
    //               url: '/pages/auth/auth?uid=' + that.data.uid
    //             })
    //           }

    //         }
    //       })

    //     },
    //   })
    // });
  },
  updateChage: function() {
    // console.log(2)
    //版本更新
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false, //取消按钮去除
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
    })
  }


})