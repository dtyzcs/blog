// 验证用户信息是否合法模块
//返回验证失败信息，若验证都成功则返回null
module.exports = function(username, email, password, role, state) {
    let usernameReg = /^([\u4e00-\u9fa5]|[a-zA-z])([\u4e00-\u9fa5]|[a-zA-z0-9]){1,9}$/;
    let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let passwordReg = /^[a-zA-Z](\w|.){5,17}$/;
    let roleReg = ['normal', 'admin'];
    let stateReg = ['0', '1'];
    let result = null;
    if(!usernameReg.test(username)) {
        result = '用户名不合法';
        return result;
    }
    if(!emailReg.test(email)) {
        result = '邮箱格式不正确';
        return result;
    }
    if(!passwordReg.test(password)) {
        result = '密码格式不正确';
        return result;
    }
    if(!roleReg.includes(role)) {
        result = '角色只能在普通用户和超级管理员之间选择';
        return result;
    }
    if(!stateReg.includes(state)) {
        result = '状态只能是启用或禁用';
        return result;
    }
    return result;
}