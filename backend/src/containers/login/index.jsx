import React, { Component } from 'react'
import {connect} from "dva"
import { Form, Input, Button} from 'antd';
import 'antd/dist/antd.css'

const mapStateToProps=(state)=>{
    console.log(state,"state")
    return state.login
}
@connect(mapStateToProps)
@Form.create({
    name: 'loginFrom', mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: 'lili',
            }),
            password: Form.createFormField({
                ...props.password,
                value: '321',
            }),
        };
    },
})

 class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log(values,"values")
            if (!err) {
                this.props.dispatch({
                    type: 'login/login',
                    payload: values
                })
                this.props.history.push("/home")
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(this.props.token,"token")
        return <div>
            <h1>{this.props.token}我是标题</h1>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">登录</Button>
                </Form.Item>
            </Form>
        </div>
    }
}


export default Login;
