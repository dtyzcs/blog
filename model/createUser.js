//连接数据库
require('./connect.js');
//引入密码加密模块
const encrypt = require('../modules/encrypt.js');

//导入User规则
const User = require('./user.js');

async function run() {
    let startPwd = 'cs.123456.cs';
    let reg = /^[a-zA-Z](\w|.){5,17}$/;
    if (reg.test(startPwd)) {
        let endPwd = await encrypt(startPwd);
        User.create({
            username: 'cs',
            password: endPwd,
            email: 'cs@163.com',
            role: 'admin',
            state: 0
        }).then(() => console.log('创建成功'))
        .catch(err => console.log('创建失败', err));
    }
}
run();