const md5 = require("md5")
const url = require("url")
const { whiteList } = require("../config")

module.exports.createToken = (uid) => {
    const token = JSON.stringify({
        iss: "bwwz",
        uid: "1",
        tim: new Date().getTime()
    })
    return md5(token)
}

module.exports.requireAuth = (req, res, next) => {
    const oUrl = url.parse(req.url)
    const authorization = req.headers.authorization
    const inList = whiteList.filter(item => {
        return item === oUrl.path || oUrl.path.includes(item)
    })

    //添加对token的校验
    //判断当前路由在白名单是否存在
    if (authorization || inList.length) {
        next()
    } else {
        res.statusCode = 401
        res.json({
            code: 0,
            msg: "没有权限访问！！！"
        })
    }
}