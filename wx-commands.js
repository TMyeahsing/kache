//�����û���
$.promiseAjax({
    url: '/api/wechat_group',
    type: 'post',
    data: {
        group_name: '�˴�����'
    },
    success(data){
        console.log(data)
    }
})

//�ƶ��û���ĳ����
$.promiseAjax({
    url: '/api/wechat_group/move_user_to',
    type: 'post',
    data: {
        openid: 'oKGD_vnz-JnTTBKbxj6aolZ0IFGc',
        group_id: 100
    },
    success(data){
        console.log(data)
    }
})


//�޸Ĺ��ںŲ˵�
$.promiseAjax({
    url: '/api/wechat_menu',
    type: 'put',
    success(data){
        console.log(data)
    }
})