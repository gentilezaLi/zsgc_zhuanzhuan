import React from "react"
import RouterMap from "./map"
// import Routes from "./routes"

function RouterView(props){
  let {routes,history}=props
  // const routes=props.routes?props.routes:Routes
  return <RouterMap routes={routes} history={history}></RouterMap>
}

export default RouterView;