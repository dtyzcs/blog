//引入验证用户模块
const checkUser = require('../../model/checkUser.js');
//引入User构造规则
const User = require('../../model/user.js');
//引入密码加密模块
const encrypt = require('../../modules/encrypt.js');

module.exports = async (req, res, next) => {
    let {username, email, password, role, state} = req.body;
    let {id} = req.query;
    // 验证用户信息格式
    let checkResult = checkUser(username, email, password, role, state);
    if (checkResult) {
        //验证未通过,重新渲染更新用户信息页面，并提示错误信息
        let user = {
            _id: id,
            username: username,
            email: email,
            password: password,
            role: role,
            state: state
        };
        res.render('admin/user-edit', {user: user, message: checkResult});
    } else {
        try {
            //验证通过，加密密码，更新数据库中的信息
            let newPwd = await encrypt(password);
            await User.updateOne({_id: id}, {
                username: username,
                email: email,
                password: newPwd,
                role: role,
                state: state
            });
            //重定向到用户管理页面
            res.redirect('/admin/user');
        } catch (err) {
            //错误处理
            next(err);
        }
    }
}