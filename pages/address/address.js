
Page({
    data: {
        openType: 0,
        hasPhone: true,
      cellClass: [{ receiverName: '小崔', receiverPhone: '188****8765', area: '江苏省苏州市姑苏区', address: '乐桥888号',isDefault:0}],
        isFromGoodsDetail: false,
    

        disTouch:false
    },

    touchAdressCell(e){
        if(! this.data.isFromGoodsDetail){
            var item = e.currentTarget.dataset.item;
            wx.setStorageSync('addressData', item);
            wx.navigateTo({
                url: '../addressAdd/addressAdd',
            })

        }else{
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];  //上一个页面
            let item = e.currentTarget.dataset.item;
            //console.log('xxxxxxxxxxxxxxxxx222  item=', item);
            let areas = item.area.split('/');
            
            prevPage.setData({
                'orderConf.defaultAddress.receiverName':item.receiverName,
                'orderConf.defaultAddress.receiverPhone':item.receiverPhone,
                'orderConf.defaultAddress.area': areas[0]+areas[1]+areas[2],
                'orderConf.defaultAddress.address':item.address
            },()=>{
                wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                })
            })
        }
    },
    modifyAddressButtonClick(e) {
      var item = e.currentTarget.dataset.item;
      wx.setStorageSync('addressData', item);
      wx.navigateTo({
        url: '../addressAdd/addressAdd',
      })
    },
    // 显示获取手机号界面
    getMsg(e) {
        this.setData({
            verificationPhone: true
        })
    },

    // 获取收货地址
    reqReceivingAddress(data) {
        // var that = this;
        // let param = {};
        // req.Post(url.urlString.customerAddress, param, function Success(res) {
        //     console.log(res);
        //     if (res.code == 0) {
        //         that.setData({
        //             cellClass: res.data.list
        //         })
        //     } else {
        //         wx.showToast({
        //             title: res.message,
        //         });
        //     }
        // });
    },

    // 添加收货地址
    toAddNewAddressUI() 
    {
        wx.navigateTo({
            url: '/pages/addressAdd/addressAdd',
        })
    },

    onLoad: function (options) {
      if (options.isFromGoodsDetail!=undefined)
      {
        this.setData({
            isFromGoodsDetail:options.isFromGoodsDetail
        })
      }
    },
    onReady: function () {
        //Do some when page ready. 
    },
    onShow: function () {
        //Do some when page show.
        this.reqReceivingAddress();
    },
    onHide: function () {
        //Do some when page hide.

    },
    onUnload: function () {
        //Do some when page unload.

    },
    onPullDownRefresh: function () {
        //Do some when page pull down.

    }
})