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

//�鿴����
$.promiseAjax({
    url: '/api/wechat_group',
    success(data){
        console.log(data)
    }
})

//�ƶ��û���ĳ����
$.promiseAjax({
    url: '/api/wechat_group/move_user_to',
    type: 'put',
    data: {
        openid: 'oKGD_vnz-JnTTBKbxj6aolZ0IFGc',
        group_id: 100
    },
    success(data){
        console.log(data)
    }
})


//���ɹ��ںŲ˵�
$.promiseAjax({
    url: '/api/wechat_menu',
    type: 'put',
    success(data){
        console.log(data)
    }
})

//�����Զ��幫�ںŲ˵�
$.promiseAjax({
    url: '/api/wechat_menu/custom',
    type: 'post',
    success(data){
        console.log(data)
    }
})

//��ȡ�˵�
$.promiseAjax({
    url: '/api/wechat_menu',
    success(data){
        console.log(data)
    }
})