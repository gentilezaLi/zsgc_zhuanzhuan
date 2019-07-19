var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser")
const bodyParserMidllware = bodyParser.urlencoded({ extended: false })

const { Login, Registry, Show, Update, Delete } = require("../controller/user")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//后台登录接口
router.post('/user/login', bodyParserMidllware, Login)
    //后台添加接口
router.post('/user/adduser', bodyParserMidllware, Registry)
    //查看用户接口
router.get('/user/showuser', Show)
    //更新用户接口
router.post('/user/update', bodyParserMidllware, Update)
    //删除用户接口
router.post('/user/delete', bodyParserMidllware, Delete)


module.exports = router;