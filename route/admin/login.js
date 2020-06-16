//引入User模块
const User = require('../../model/user.js');
// 引入加密模块
const encrypt = require('../../modules/encrypt.js');
//引入bcrypt密码加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // 获取参数
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    try {
        if (email.length > 0 && password.length > 0) {
            //从数据库中根据email查询数据
            let data = await User.findOne({ email: email })
            if (data) {
                //若查询到用户信息，把客户端传过来的密码与数据库中查询到的密码比对
                let isEqueal = await bcrypt.compare(password, data.password);
                if (isEqueal) {
                    // 密码正确，把用户名加入session，重定向到用户管理页面
                    req.session.username = data.username;
                    req.session.role = data.role;
                    req.app.locals.userInfo = data;
                    res.redirect('/admin/user');
                    return;
                }
            }
        }
        //邮箱或密码错误，渲染到错误提示页面
        res.status(400).render('admin/error', {
            message: '邮箱或密码错误'
        });
    } catch (err) {
        next(err);
    }
}