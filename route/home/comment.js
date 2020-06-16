//引入评论验证模块
const checkComment = require('../../model/checkComment.js');
// 引入评论验证规则
const Comment = require('../../model/comment.js');

module.exports = async (req, res, next) => {
    let { userid, articleid, content } = req.body;
    let result = checkComment(userid, articleid, content);
    if(result) {
        //验证不通过，渲染提示页面
        res.render('admin/error', {message: result});
    } else {
        //验证通过
        try {
            //数据加入数据库
            await Comment.create({
                user: userid,
                article: articleid,
                content: content 
            });
            //重定向到文章详情页
            res.redirect(`/home/article?id=${articleid}`);
        } catch(err) {
            next(err);
        }
    }
}