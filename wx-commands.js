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

//������ҵ
$.promiseAjax({
    url: '/api/wechat_template/industry',
    type: 'post',
    data: {
        id1: '25',
        id2: '41'
    },
    success(data){
        console.log(data)
    }
})

//���ģ��
//1�����޵��ύ֪ͨ
//content: "{{first.DATA}}??����{{name.DATA}}��Ч����{{expDate.DATA}}?{{remark.DATA}}"
//deputy_industry: "�������"
//example: "���ã����Ļ�Ա�������ڣ�����ע�⡣??����΢��ĳĳ���Ա��Ч����2013��9��12�գ���ע��ʱ�䣬��ֹ����ʧЧ��"
//primary_industry: "��ͨ����"
//template_id: "j4j18Eq7T5pWNe6n28jmDGe4GUzuZfRM7Lsmcemrrxk"
//title: "��Ա��������"
//--------------------------------------------
//2��ԤԼ��ԤԼ֪ͨ
//content: "{{first.DATA}}??ԤԼ{{productType.DATA}}��{{name.DATA}}?ԤԼʱ�䣺{{time.DATA}}?ԤԼ�����{{result.DATA}}?{{remark.DATA}}"
//deputy_industry: "�������"
//example: "���ã�����ԤԼ�⳵�ɹ���??ԤԼ����С�γ�������ͨά��?ԤԼʱ�䣺2013��11��6�� 14:00?ԤԼ�������ԤԼ?�������ʣ�����ѯ13912345678��"
//primary_industry: "��ͨ����"
//template_id: "Xxvp9EreeSvBeHO97V10FfOAdgSCaCqMSmuvA9HL0gQ"
//title: "����ԤԼ֪ͨ"

$.promiseAjax({
    url: '/api/wechat_template/template',
    type: 'post',
    data: {
        id: 'TM00113'   //113~120,173~174
    },
    success(data){
        console.log(data)
    }
})