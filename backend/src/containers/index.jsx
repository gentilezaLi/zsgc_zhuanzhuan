import React from 'react'
import "../assets/css/common.css"
import "../assets/css/iconfont.css"
import "../assets/css/reset.css"
import routes from "../route/routes"
import RouterView from "../route"

function componentName({history}) {
    return (
        <RouterView routes={routes} history={history}></RouterView>
    )
}

export default componentName
