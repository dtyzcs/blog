//引入article构造规则
const Article = require('../../model/article.js');

module.exports = async (req, res, next) => {
    let {id} = req.query;
    try {
        //删除操作
        await Article.findOneAndDelete({_id: id});
        //重定向到用户管理页面
        res.redirect('/admin/articleManage');
    } catch(err) {
        next(err);
    }
}