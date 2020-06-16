module.exports = (req, res) => {
    //获取错误信息
    let {message} = req.query;
    res.render('admin/user-edit',{message: message});
}