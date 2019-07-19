//登录接口
const mysql = require("mysql")
const { createToken } = require("../utils")
const { sqlConfig } = require("../config")
const connection = mysql.createConnection(sqlConfig)
connection.connect()

//登录接口
module.exports.Login = (req, res) => {
    //解构传过来的
    const { username, password, type = 0 } = req.body
    console.log(username, password, type, "********************************")
        //把前台传过来的用户名，密码，拼接sql语句到数据库查询
    const $sql = `select * from user where username='${username}' and password='${password}' and type='${type}' `

    connection.query($sql, (error, results) => {
        if (error) {
            res.statueCode = 500
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            console.log(results.length, "11111111111111111111111")
            if (results.length > 0) {
                const token = createToken(results[0].id)
                    // console.log(token, "*****************")
                    //更新token到数据库
                    // const $save = `update user set token='${token}' where id=${results[0].id}`
                    // connection.query($save, (error, results) => {
                    //     if (error) {
                    //         return console.error(error)
                    //     }
                    // })
                res.statueCode = 200
                res.json({
                    code: 1,
                    msg: "success",
                    token: token
                })
            } else {
                res.statueCode = 401
                res.json({
                        code: 0,
                        msg: "没有权限访问!!!"
                    })
                    // return console.error(error)
            }
        }
    })
}

//添加用户接口
module.exports.Registry = (req, res) => {
    const { username, password, type } = req.body
    const $sql = 'insert into user (`username`,`password`,`type`) VALUES (?,?,?)';
    const $params = [username, password, type]
    connection.query($sql, $params, (error, results) => {
        if (error) {
            res.statueCode = 500
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            res.statueCode = 200
            res.json({
                code: 1,
                msg: "插入成功"
            })
        }
    })
}

//查看用户接口
module.exports.Show = (req, res) => {
    const $sql = 'select * from user';
    connection.query($sql, (error, results) => {
        if (error) {
            res.statueCode = 500
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            res.statueCode = 200
            console.log(results)
            res.json({
                code: 1,
                msg: "插入成功",
                result: results
            })
        }
    })
}

//更新用户接口
module.exports.Update = (req, res) => {
        let { username, password, type, id } = req.body
        console.log(username, password, type, id, "------------------------------")
        const $sql = 'update user set username=?,password=?,type=? where id=?';
        const $params = [username, password, type, id]
        connection.query($sql, $params, (error, results) => {
            if (error) {
                res.statueCode = 500
                res.json({
                    code: 0,
                    msg: error
                })
                return console.error(error)
            } else {
                res.statueCode = 200
                console.log(results)
                res.json({
                    code: 1,
                    msg: "更新成功",
                })
            }
        })
    }
    //删除用户接口
module.exports.Delete = (req, res) => {
    const { id } = req.body
    const $sql = 'delete from user where id=?';
    connection.query($sql, [id], (error, results) => {
        if (error) {
            res.statueCode = 500
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            res.statueCode = 200
            console.log(results)
            res.json({
                code: 1,
                msg: "删除成功",
                result: results
            })
        }
    })
}