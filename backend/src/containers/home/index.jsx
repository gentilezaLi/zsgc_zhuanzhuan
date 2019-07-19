import React, { Component } from 'react'
import Wraper from "../../components/layout"
import RouterView from "../../route"
 class Home extends Component {
    render() {
        const {children,history} =this.props
        return (
            <Wraper>
                this id home page
                <RouterView routes={children} history={history}></RouterView>
            </Wraper>
        )
    }z
}
export default Home
