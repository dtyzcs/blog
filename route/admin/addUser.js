// 引入用户信息验证模块
const checkUser = require('../../model/checkUser.js');
// 引入User规则模块
const User = require('../../model/user.js');
// 引入密码加密模块
const encrypt = require('../../modules/encrypt.js');

module.exports = async (req, res, next) => {
    let {username, email, password, role, state} = req.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();
    role = role.trim();
    state = state.trim();
    //验证用户信息
    let result = checkUser(username, email, password, role, state);
    // 验证通过
    if(!result) {
        //从数据库中根据email查询数据
        // 若查询到数据则数据库中已有此email，提示用户并返回添加用户页面
        // 若没有查询到数据则此email可以使用
        try {
            let userInfo = await User.findOne({email: email});
            if(userInfo) {
                //查询到用户信息，当前email不可用
                res.redirect(`/admin/user-edit?message=当前email已被使用，请更换email或检查email是否拼写正确`);
            } else {
                //未查询到用户信息，当前email可用
                // 密码加密
                password = await encrypt(password);
                req.body.password = password;
                //向数据库中插入此用户信息
                await User.create(req.body);
                // 重定向到新增用户页面
                res.redirect('/admin/user-edit');
                return;
            }
        } catch(err) {
           next(err);
        }
    } else {
        // 验证不通过,重定向到添加用户页面
        res.redirect(`/admin/user-edit?message=${result}`);
    }
}