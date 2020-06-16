//评论构造规则

//引入mongoose模块
const mongoose = require('mongoose');

//创建规则
const commentSchema = new mongoose.Schema({
    //用户id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        trim: true
    },
    // 文章id
    article: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Article',
        trim: true
    },
    // 评论内容
    content: {
        type: String,
        required: true
    },
    // 评论时间
    commentDate: {
        type: Date,
        default: new Date()
    }
});

//应用规则
const Comment = mongoose.model('Comment', commentSchema);

//导出规则
module.exports = Comment;