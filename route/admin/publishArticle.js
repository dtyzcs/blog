// 发布文章模块

// 引入文件上传参数获取模块formidable
const formidable = require('formidable');
const path = require('path');
//引入Article构造规则
const Article = require('../../model/article.js');
//一如article验证模块
const checkArticle = require('../../model/checkArticle.js');

module.exports = (req, res, next) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置文件上传路径
    form.uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
    //保留文件扩展名
    form.keepExtensions = true;
    //解析表单
    form.parse(req, async (err, fields, files) => {
        if(!err) {
            let {title, author, content} = fields;
            let cover = files.file.path.split('public')[[1]];
            // 验证文章信息是否合法
            let result = checkArticle(title, author, cover, content);
            if(result) {
                //验证不通过
                res.render('admin/error', {message: result});
            } else {
                //验证通过，写入数据库
                await Article.create({
                    title: title,
                    author: author,
                    cover: cover,
                    content: content
                })
                res.redirect('/admin/newArticle');
            }
        } else {
            next(err);
        }
    });
}