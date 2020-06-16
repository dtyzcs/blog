//MongoDB数据库连接模块

//引入mongoose模块
const mongoose = require('mongoose');
//引入config模块
const config = require('config');


//连接数据库
mongoose.connect(`mongodb://${config.get('db.username')}:${config.get('db.password')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.dbName')}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.error('数据库连接失败', err));