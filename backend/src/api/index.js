//用封装的request来代替axios
import request from "../utils/request"

//默认type类型给1
const defaultParams = {
    type: 1
}

//登录接口
export function userLogin(payload) {
    console.log(payload, "12333")
    const url = "/user/login"
    return request.post(url, {
        ...defaultParams,
        ...payload
    })
}

//添加用户接口
export function addUser(payload) {
    const url = "/user/adduser"
    return request.post(url, {
        ...defaultParams,
        ...payload
    })
}

//获取用户列表接口
export function getUserList() {
    const url = "/user/showuser"
    return request.get(url)
}

//更新用户信息接口
export function updataUser(payload) {
    const url = "/user/update"
    return request.post(url, {
        ...payload
    })
}

//删除用户列表接口
export function deleteUser(id) {
    const url = "/user/delete"
    return request.post(url, { id })
}