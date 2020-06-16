module.exports = (req, res, next) => {
    let username = req.session.username;
    if(req.url != '/login' && !username) {
        // 未登录处理
        //重定向到登录页面
        res.redirect('/admin/login');
    } else {
        //判断用户角色，普通用户跳转到主页，管理员员跳转到用户管理页面
        if(req.session.role == 'normal') {
            //普通用户，重定向到首页
            res.redirect('/home');
            return;
        }
        //管理员用户，交个下一层处理
        next();
    }
}