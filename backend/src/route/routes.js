import Home from "../containers/home"
import Login from "../containers/login"
import AddUser from "../containers/user/adduser"
import ShowUser from "../containers/user/show"
export default [{
    path: "/home",
    name: "home",
    component: Home,
    children: [{
        path: "/home/adduser",
        name: "adduser",
        component: AddUser
    }, {

        path: "/home/show",
        name: "show",
        component: ShowUser

    }]
}, {
    path: "/login",
    name: "login",
    component: Login
}, {
    path: "/",
    redirect: "/login"
}]