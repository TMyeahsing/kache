'use strict'
import {bitTo2, getJssdkConfig} from './../assets/js/utils.js'
import actionSheet from '../components/actionsheet/actionsheet.vue'

$.promiseAjax({
    url: 'https://api.leancloud.cn/1.1/classes/Order/' + UrlParams.id,
    beforeSend(xhr, setting){
        xhr.setRequestHeader('X-LC-Id', AppId);
        xhr.setRequestHeader('X-LC-Key', AppKey);
        xhr.setRequestHeader('X-LC-Session', SessionToken);
    },
    contentType: 'application/json',
    data: {
        include: 'createdBy, quotation'
    }
}).catch(function(err){

}).then(function(data){
    new Vue({
        el: '#main_contain',
        components: {
            actionSheet: actionSheet
        },
        data: {
            order: data,
            statusMap: OrderStatusMap,
            location: '地址获取中',
            payActionSheetShown: false,
            payMenus: {
                'pay_by_cash': '现金支付'/*,
                'pay_by_wechat': '微信支付'*/
            },
            payActions: {
                'pay_cancel': '取消'
            },
            now: undefined
        },
        created(){
            var self = this;

            $.promiseAjax({
                url: 'https://api.leancloud.cn/1.1/date'
            }).then(function(data){
                self.now = (+new Date(data.iso));
                var _countDown = setInterval(function(){
                    self.now += 1000;
                }, 1000);
            }).catch(err => console.log(err));

            //jssdk配置，获取地址
            getJssdkConfig(['getLocation']).then(function(config){
                wx.config(config);
                wx.ready(function(){
                    wx.getLocation({
                        type: 'gcj02',
                        success: function(location){
                            $.promiseAjax({
                                url: 'http://apis.map.qq.com/ws/geocoder/v1/',
                                data: {
                                    location: location.latitude + ',' + location.longitude,
                                    key: TMapKey,
                                    output: 'jsonp'

                                },
                                dataType: 'jsonp'
                            }).then(function(data){
                                if(data.status == 0){
                                    self.location = data.result.address;
                                }
                            })
                        }
                    })
                })
            })
        },
        methods: {
            confirmOrder(){
                var self = this;
                ToastHandler.showLoading('正在确认...');
                $.promiseAjax({
                    url: '/api/order/confirm',
                    type: 'put',
                    data: {
                        order_object_id: UrlParams.id
                    }
                }).then(function(data){
                    if(data.success){
                        ToastHandler.hideLoading();
                        ToastHandler.showToast('操作成功');
                        self.order.status = 1;
                    }
                }).catch(function(err){
                    ToastHandler.hideLoading();
                    console.log(err)
                })
            },
            confirmFixed(){
                var self = this;
                ToastHandler.showLoading('操作处理中...');
                $.promiseAjax({
                    url: '/api/order/confirm_fixed',
                    type: 'put',
                    data: {
                        order_object_id: UrlParams.id
                    }
                }).then(function(data){
                    if(data.success){
                        ToastHandler.hideLoading();
                        ToastHandler.showToast('操作成功');
                        self.order.status = 3;
                        self.payActionSheetShown = true;
                    }
                }).catch(function(err){
                    ToastHandler.hideLoading();
                    console.log(err)
                })
            },
            payLeft(){
                this.payActionSheetShown = true;
            }
        },
        events: {
            'weui-menu-click'(message){
                var self = this;
                switch(message){
                    case 'pay_by_cash':
                        ToastHandler.showLoading();
                        $.promiseAjax({
                            url: '/api/order/cash_pay',
                            type: 'put',
                            data: {
                                order_object_id: UrlParams.id
                            }
                        }).then(function(data){
                            ToastHandler.hideLoading();
                            ToastHandler.showToast('操作成功');
                            self.payActionSheetShown = false;
                            self.order.cashConfirming = true;
                        }).catch(function(err){
                            ToastHandler.hideLoading();
                            console.log(err)
                        })
                        break;
                    default:
                        console.log('暂不支持');
                        break;
                }
            }
        },
        filters: {
            countDownText(value){
                if(value <= 0){
                    return '<p class="color_red">已超时</p>'
                }else{
                    var _str = '';
                    var _min = '';
                    var _sec = '';
                    value = Math.round(value/1000);
                    _min = bitTo2(parseInt(value/60));
                    _sec = bitTo2(value%60);
                    return '接单倒计时<p class="color_green">' + _min + ' : ' + _sec + '</p>';
                }
            }
        }
    })
})
