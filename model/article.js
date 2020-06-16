// article 构造规则模块

//引入mongoose模块
const mongoose = require('mongoose');


//设置集合规则
const articleSchema = new mongoose.Schema({
    // 标题
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    // 作者id
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    // 封面路径
    cover: {
        type: String,
        required: true
    },
    // 内容
    content: {
        type: String,
        required: true
    },
    // 发布时间
    publishDate: {
        type: Date,
        default: new Date()
    }
});

// 应用规则
const Article = mongoose.model('Article', articleSchema);

//导出规则
module.exports = Article;