//引入User构造规则
const Article = require('../../model/article.js');

module.exports = async (req, res, next) => {
    try {
        let {id} = req.query;
        //根据id查询文章信息
        let article = await Article.findOne({_id: id});
        console.log(article);
        //渲染文章编辑页面
        res.render('admin/article-edit', {article: article});
    } catch(err) {
        next(err);
    }
}