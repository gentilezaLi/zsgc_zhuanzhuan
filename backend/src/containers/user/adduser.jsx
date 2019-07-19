import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
import {addUser} from "../../api/index"
const { Option } = Select;

@Form.create({
    name: 'AddUserFrom', mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: 'lalaa',
            }),
            password: Form.createFormField({
                ...props.password,
                value: '321asdsa',
            }),
            type: Form.createFormField({
                ...props.type,
                value: "0",
            }),
        };
    },
})
 class Adduser extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log(values,"values")
            if (!err) {
               console.log(values,"添加了，至于行不行就不知道了")
               console.log(addUser(),"添加发起axios请求")
               addUser(values).then(res=>{
                   console.log(res,"发送数据到后台")
               })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
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
                    <Form.Item label="身份">
                        {
                            getFieldDecorator('type',{
                            rules: [{ required: true, message: '请选择身份!' }],
                            })( <Select >
                            <Option value="0">游客</Option>
                            <Option value="1">管理员</Option>
                        </Select>)
                        }
                       
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Adduser