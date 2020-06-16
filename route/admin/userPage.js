// 引入user规则
const User = require('../../model/user.js');


module.exports = async (req, res, next) => {
    try {
        //从数据库中查询用户信息
        let num = 10;//每页显示数据的条数
        //获取数据库中数据的总条数
        let totalCount = await User.countDocuments({});
        //计算总页数
        let maxPage = Math.ceil(totalCount / num);
        
        //获取从客户端传过来的页码
        let page = parseInt(req.query.page);
        let currentPage = page && page > 0 ? page : 1;
        //查询当前页码下的数据
        let users = await User.find({}).skip((currentPage - 1) * num).limit(num);
        // 渲染用户信息展示页面
        res.render('admin/user', {
            users: users,
            currentPage: currentPage,
            maxPage: maxPage,
            userManage: true
        });
    } catch (err) {
        next(err);
    }
}