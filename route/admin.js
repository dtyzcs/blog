// 引入expres框架模块
const express = require('express');
//创建路由对象
const admin = express.Router();

// 路由到登录界面
admin.get('/login', require('./admin/loginPage.js'));
// 退出功能
admin.get('/logout', require('./admin/logout.js'))
//路由到用户管理页面
admin.get ('/user', require('./admin/userPage.js'));
//路由到新增用户页面
admin.get('/user-edit', require('./admin/user-edit.js'));
//路由到更新用户页面
admin.get('/userUpdate', require('./admin/userUpdatePage.js'));
//删除用户操作
admin.get('/deleteUser', require('./admin/deleteUser.js'));
//路由到文章管理页面
admin.get('/articleManage', require('./admin/articleManage.js'));
//路由到文章发布页面
admin.get('/newArticle', require('./admin/publishArticlePage.js'));
//删除文章操作
admin.get('/deleteArticle',require('./admin/deleteArticle.js'));
// 路由到更新文章页面
admin.get('/updateArticle', require('./admin/updateArticlePage.js'));

// 登录操作
admin.post('/login', require('./admin/login.js'));
//添加用户操作
admin.post('/addUser', require('./admin/addUser.js'));
//更新用户操作
admin.post('/userUpdate', require('./admin/userUpdate.js'));
//发布文章操作
admin.post('/publishArticle', require('./admin/publishArticle.js'));
// 更新文章操作
admin.post('/updateArticle', require('./admin/updateArticle.js'));



// 导出admin
module.exports = admin;