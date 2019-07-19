/*
 * @Author: binbin 
 * @Date: 2019-07-16 14:10:15 
 * @Last Modified by: binbin
 * @Last Modified time: 2019-07-19 20:16:34
 */

//路由白名单
module.exports.whiteList = [
    "/user/login",
    "/user/adduser",
    "/user/showuser",
    "/user/delete"
]

//数据库配置
module.exports.sqlConfig = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: "123321",
    database: 'zhuanzhuan'
}