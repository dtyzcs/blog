//引入User构造规则
const User = require('../../model/user.js');

module.exports = async (req, res, next) => {
    try {
        let {id} = req.query;
        //根据id查询用户信息
        let user = await User.findOne({_id: id});
        //渲染用户编辑页面
        res.render('admin/user-edit', {user: user});
    } catch(err) {
        next(err);
    }
}