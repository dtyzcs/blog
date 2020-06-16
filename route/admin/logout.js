//注销功能模块
module.exports = (req, res) => {
    //获取角色信息
    let role = req.session.role;
    // 修改session
    req.session.destroy(function() {
        //删除cookie
        res.clearCookie('connect.sid');
        // 清除用户信息
        req.app.locals.userInfo = null;
        if(role == 'admin') {
            // 管理员退出，重定向到登录页面
            res.redirect('/admin/login');   
        } else {
            //普通用户退出，重定向到主页
            res.redirect('/home');
        }
        
    });
}