import React, { Component } from 'react'
import "./index.css"
import { Layout, Menu, Icon } from 'antd';
import { sliderBar } from "../../config/sliderbar"
import {NavLink} from "dva/router"
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
export default class componentName extends Component {
    state = {
        collapsed: false,
        sliderBar
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {

        return (
            <Layout style={{ minHeight: '100vh' }}>

                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="pt15 pb15">
                        <h1 className="text-white pl15">赚赚后台管理</h1>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        {
                            this.state.sliderBar.map((item, index) => {
                                return item.children === undefined || item.children.length < 1 ?
                                    <Menu.Item key={item.id}>
                                        <Icon type={item.icon} />
                                        <span>{item.name}</span>
                                    </Menu.Item>
                                    :
                                    <SubMenu key={item.id}
                                        title={
                                            <div >
                                                <Icon type={item.icon} />
                                                <NavLink to={item.path}> {item.name}</NavLink>
                                               
                                            </div>
                                        }
                                    >{
                                            item.children && item.children.map((ite, ind) => {
                                                return <Menu.Item key={ite.id} >
                                                    <Icon type={item.icon} />
                                                <NavLink   to={ite.path}>{ite.name}</NavLink>
                                                    </Menu.Item>
                                            })
                                        }

                                    </SubMenu>
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="pl15"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content className="m15 p15 bg-white">
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
