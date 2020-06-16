// 导入bcrypt密码加密模块
const bcrypt = require('bcrypt');

/**
 * 密码加密函数
 * @param {要加密的密码明文} password 
 * return-加密后的密码密文
 */
async function encrypt(password) {
    let salt = await bcrypt.genSalt(10);
    let result = await bcrypt.hash(password, salt);
    return result;
}

module.exports = encrypt;