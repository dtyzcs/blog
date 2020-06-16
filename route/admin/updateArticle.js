// 更新文章模块

// 引入文件上传参数获取模块formidable
const formidable = require('formidable');
const path = require('path');
//引入Article构造规则
const Article = require('../../model/article.js');
//一如article验证模块
const checkArticle = require('../../model/checkArticle.js');

module.exports = (req, res) => {
    //获取article id
    let { id } = req.query;
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
                //验证通过，修改数据库中的值
                await Article.updateOne({ _id: id },{
                    title: title,
                    author: author,
                    cover: cover,
                    content: content
                })
                //重定向到文章管理页面
                res.redirect('/admin/articleManage');
            }
        } else {
            next(err);
        }
    });
}