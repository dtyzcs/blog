//评论合法性验证模块

function checkComment(userid, articleid, content) {
    let result = null;
    if(!userid || userid.trim().length == 0) {
        result = '用户id不能为空';
    }
    if(!articleid || articleid.trim().length == 0) {
        result = '文章id不能为空';
    }
    if(!content || content.trim().length == 0) {
        result = '评论内容不能为空';
    }
    return result;
}

module.exports = checkComment;
