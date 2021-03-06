'use strict'

import {bitTo2} from './../assets/js/utils.js'

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
        data: {
            order: data,
            statusMap: OrderStatusMap,
            isPriceFormulatorShown: false,
            dropInFee: undefined,
            manHours: undefined,
            manUnitPrice: undefined,
            partsTotal: undefined,
            partsDesc: '',
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
        },
        methods: {
            showPriceFormulator(){
                this.isPriceFormulatorShown = true;
            },
            hidePriceFormulator(){
                this.isPriceFormulatorShown = false;
            },
            priceFormulatorTouch(ev){
                ev.preventDefault();
            },
            takeOrder(){
                var self = this;
                ToastHandler.showLoading('操作处理中...');
                $.promiseAjax({
                    url: '/api/order/take',
                    type: 'put',
                    data: {
                        drop_in_fee: self.dropInFee,
                        man_hours: self.manHours,
                        man_unit_price: self.manUnitPrice,
                        parts_total: self.partsTotal,
                        parts_desc: self.partsDesc,
                        order_object_id: UrlParams.id
                    }
                }).then(function(data){
                    ToastHandler.hideLoading();
                    if(data.success){
                        ToastHandler.showToast('操作成功');
                        self.order.quotation = data.data.quotation;
                        self.hidePriceFormulator();
                    }else{

                    }
                }).catch(function(err){
                    ToastHandler.hideLoading();
                    console.log(JSON.parse(err.responseText));
                })
            },
            fixDone(){
                var self = this;
                ToastHandler.showLoading('操作处理中...');
                $.promiseAjax({
                    url: '/api/order/fix_done',
                    type: 'put',
                    data: {
                        order_object_id: UrlParams.id
                    }
                }).then(function(data){
                    ToastHandler.hideLoading();
                    if(data.success){
                        ToastHandler.showToast('操作成功');
                        self.order.status = data.data.status;
                        self.hidePriceFormulator();
                    }else{

                    }
                }).catch(function(err){
                    ToastHandler.hideLoading();
                    console.log(JSON.parse(err.responseText));
                })
            },
            incomeConfirm(){
                var self = this;
                DialogHandler.prompt('确认收款', '收款金额:', '', function(income){
                    if(/[^\d]/.test(income)){
                        DialogHandler.alert('操作失败', '请输入整数', function(){
                            setTimeout(self.incomeConfirm, 0);
                        });
                        return;
                    }
                    ToastHandler.showLoading('操作处理中...');
                    $.promiseAjax({
                        url: '/api/order/confirm_income',
                        type: 'put',
                        data: {
                            order_object_id: UrlParams.id,
                            income: income
                        }
                    }).then(function(data){
                        ToastHandler.hideLoading();
                        ToastHandler.showToast('操作成功');
                        DialogHandler.hide();
                        self.order.quotation = data.data.quotation;
                        self.order.status = data.data.status;
                        self.order.cashConfirming = false;
                    }).catch(function(err){
                        ToastHandler.hideLoading();
                        DialogHandler.alert('操作失败', JSON.parse(err.responseText).message);
                    });
                })
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
