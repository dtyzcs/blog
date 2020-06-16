//文章信息验证模块

function checkArticle(title, author, cover, content) {
    let result = null;
    if(title.trim().length < 2 || title.trim().length > 30) {
        result = '文章标题只能是2-30位';
        return result;
    }
    if(!author || author.trim().length == 0) {
        result = '作者格式不正确';
        return result;
    }
    if(!cover) {
        result = '封面路径不正确';
        return result;
    }
    if(!content || content.length == 0) {
        result = '文章内容不能为空';
        return result;
    }
    return result;
}

module.exports = checkArticle;