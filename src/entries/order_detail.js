'use strict'
/*wx.config({
    debug: true, // ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���alert��������Ҫ�鿴����Ĳ�����������pc�˴򿪣�������Ϣ��ͨ��log���������pc��ʱ�Ż��ӡ��
    appId: 'wxa196eef9e5f0511c', // ������ںŵ�Ψһ��ʶ
    timestamp: new Date(), // �������ǩ����ʱ���
    nonceStr: '', // �������ǩ���������
    signature: '',// ���ǩ��������¼1
    jsApiList: ['getLocation'] // �����Ҫʹ�õ�JS�ӿ��б�����JS�ӿ��б����¼2
});

wx.ready(function(data){
    console.log(data)
    wx.getLocation({
        type: 'wgs84', // Ĭ��Ϊwgs84��gps���꣬���Ҫ����ֱ�Ӹ�openLocation�õĻ������꣬�ɴ���'gcj02'
        success: function (res) {
            console.log(res.latitude)
            var latitude = res.latitude; // γ�ȣ�����������ΧΪ90 ~ -90
            var longitude = res.longitude; // ���ȣ�����������ΧΪ180 ~ -180��
            var speed = res.speed; // �ٶȣ�����/ÿ���
            var accuracy = res.accuracy; // λ�þ���
        }
    });
})*/

$.promiseAjax({
    url: 'https://api.leancloud.cn/1.1/classes/Order/' + UrlParams.id,
    beforeSend(xhr, setting){
        xhr.setRequestHeader('X-LC-Id', AppId);
        xhr.setRequestHeader('X-LC-Key', AppKey);
        xhr.setRequestHeader('X-LC-Session', SessionToken);
    },
    contentType: 'application/json',
    data: {
        include: 'createdBy'
    }
}).catch(function(err){

}).then(function(data){
    new Vue({
        el: '#main_contain',
        data: {
            order: data,
            statusMap: OrderStatusMap
        },
        created(){
            var self = this;
        },
        methods: {

        }
    })
})
