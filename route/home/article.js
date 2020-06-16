// 文章详情页路由模块

//引入分页模块mongoose-sex-page
const paging = require('mongoose-sex-page');
// 引入dateformat时间格式化模块
const dateformat = require('dateformat');

//引入article构造规则
const Article = require('../../model/article.js');
//引入Comment构造规则
const Comment = require('../../model/comment.js');

module.exports = async (req, res, next) => {
    let { id, page } = req.query;
    try {
        let currentPage = page && page > 0 ? page : 1;
        //根据文章id查询文章数据
        let article = await Article.findOne({_id: id}).populate('author');
        //根据文章id查询评论数据
        let comments = await paging(Comment).find({article: id}).sort({_id: -1}).populate('user').page(currentPage).size(10).display(5).exec();
        res.render('home/article', { article, dateformat, comments });
    } catch(err) {
        next(err);
    }
}