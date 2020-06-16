// home二级路由

// 引入expres框架模块
const express = require('express');
const home = express.Router();

// 路由到前台首页
home.get('/', require('./home/index.js'));
//路由到列表详情页
home.get('/article', require('./home/article.js'));

//评论发布操作
home.post('/comment', require('./home/comment.js'));

// 导出admin
module.exports = home;