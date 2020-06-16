//引入User构造规则
const User = require('../../model/user.js');

module.exports = async (req, res, next) => {
    let {id} = req.query;
    try {
        //删除操作
        await User.findOneAndDelete({_id: id});
        //重定向到用户管理页面
        res.redirect('/admin/user');
    } catch(err) {
        next(err);
    }
}