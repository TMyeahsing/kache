'use strict'

//���㵽2λ��valueΪstring��number����
function bitTo2(value){
    var str = '0' + value;
    return str.substr(-2, 2);
}

export {
    bitTo2
}
