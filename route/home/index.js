//引入article构造规则模块
const Article = require('../../model/article.js');
//引入日期格式化模块
let dateformat = require('dateformat');
//引入分页模块mongoose-sex-page
const paging = require('mongoose-sex-page');

module.exports = async (req, res, next) => {
    try {
        //获取从客户端传过来的页码
        let page = parseInt(req.query.page);
        let currentPage = page && page > 0 ? page : 1;
        //分页查询
        let articles = await paging(Article).find().populate('author').page(currentPage).size(10).display(5).exec();
        //渲染前台首页
        res.render('home/default', {articles: articles, dateformat: dateformat});
    } catch (err) {
        next(err);
    }
}