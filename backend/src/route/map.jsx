import React, { Component } from 'react'
// import dynamic from "dva/dynamic"
import { Router, Route, Switch,Redirect } from "dva/router"
 class RouterMap extends Component {
    render() {
        let { routes,  history } = this.props
        // console.log(this.props)
        //定义默认路由并且精确匹配
        // const defaultRouter=<Route to="/" exact key={'default'} render={()=>{
        //     return <Redirect to="/home"/>
        // }}/>
        let redirectArr=routes.filter(item=>item.redirect)
        let RedirectArr=redirectArr.map((item,index)=>{
            return <Redirect key={index} from={item.path} to={item.redirect}/>
        })
        routes=routes.filter(item=>!item.redirect)
        return <Router history={history}><Switch>
                {/* {
                   routes.map((item,index)=>{
                       const children=item.children===undefined?[]:item.children
                       const Comp =item.component
                       return <Route key={item.name}
                        path={item.path}
                        component={()=>{
                            return <Comp routes={children} history={history}></Comp>
                        }}
                       />
                   }).concat([defaultRouter]) 
                } */}
                {
                    routes.map((item,index)=>{
                        return <Route key={index} path={item.path}
                            render={(props)=>{
                                return <item.component children={item.children} {...props} history={history}/>
                            }}
                        />
                    })
                }
                {RedirectArr.length!==0&&RedirectArr}
            </Switch></Router> 
           
        
    }
}
export default RouterMap;
