// 用户规则模块

//引入mongoose模块
const mongoose = require('mongoose');

// 设置集合规则
const userSchema = new mongoose.Schema({
    // 用户名
    username: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: v => {
                let reg = /^([\u4e00-\u9fa5]|[a-zA-z])([\u4e00-\u9fa5]|[a-zA-z0-9]){1,9}$/;
                return reg.test(v);
            },
            message: '用户名格式不正确' 
        }
    },
    // 密码
    password: {
        type: String,
        required: true
    },
    // 邮箱
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: v => {
                let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                return reg.test(v);
            },
            message: '邮箱格式不正确'
        }
    },
    // 角色
    role: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ['normal', 'admin'],
            message: '角色只能在一定范围内选择'
        }
    },
    // 是否启用
    state: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    }
});

//应用规则
const User = mongoose.model('User', userSchema);

// 导出User
module.exports = User;