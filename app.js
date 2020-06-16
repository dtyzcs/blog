// 引入expres框架模块
const express = require('express');
// 引入express模板引擎
const artTemplate = require('express-art-template');
// 引入path模块
const path = require('path');
//引入body-parser模块
const bodyParser = require('body-parser');
// 引入express-session模块
const session = require('express-session');

// 引入home模块
const home = require(path.join(__dirname, 'route', 'home.js'));
// 引入admin模块
const admin = require(path.join(__dirname, 'route', 'admin.js'));

// 创建服务器
const app = express();

// 连接数据库
require('./model/connect.js');

//配置模板引擎
// 当渲染后缀为art的模板时 使用express-art-template
app.engine('art', require('express-art-template'));
// 设置模板存放目录
app.set('views', path.join(__dirname, 'views'));
// 渲染模板时不写后缀 默认拼接art后缀
app.set('view engine', 'art');

//配置静态资源访问，并配置静态资源存放根目录
app.use(express.static('public'));
//配置querystring处理post请求参数
app.use(bodyParser.urlencoded({extends: false}));
//配置session
app.use(session({
    secret: 'secret key',
    //未登录不保存session
	saveUninitialized: false,	
	cookie: {
        // 设置cookie过期时间
		maxAge: 24 * 60 * 60 *1000
	}
}));
//拦截所有请求，判断其是否登录
app.use('/admin', require('./middleware/loginGuard.js'));

// 配置模块化路由
app.use('/home', home);
app.use('/admin', admin);

//服务器错误处理
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('admin/error', {message: '服务器发生未知错误'});
});

// 监听端口
app.listen(80);
console.log('服务器已启动');