/**
 * 把form表单中的数据以json格式返回
 * @param {Jquery类型的form 表单元素} formEle 
 * return json格式对象
 */
function serializeToJson(formEle) {
    let params = formEle.serializeArray();
    let result = {};
    params.forEach(value => {
        result[value.name] = value.value;
    })
    return result;
}
/**
 * 验证文章表单内容是否合法
 * @param {文章标题} title 
 * @param {文章作者} author 
 * @param {封面路径} cover 
 * @param {文章内容} content 
 */
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