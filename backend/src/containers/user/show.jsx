import React, { Component } from 'react'
import { getUserList, deleteUser, updataUser } from "../../api/index"
import { Table, Divider, Tag, Modal, Select, Form, Input,message } from 'antd';

const { Option } = Select;


@Form.create({
    name: 'editFrom', mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: '',
            }),
            password: Form.createFormField({
                ...props.password,
                value: '',
            }),
            type: Form.createFormField({
                ...props.type,
                value: null,
            }),
            id: Form.createFormField({
                ...props.id,
                value: '',
            }),
        };
    },
})

class show extends Component {

    state = {
        userList: [],
        visible: false,
        modelData: {},
        columns: [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
            },
            
            {
                title: '身份',
                key: 'type',
                dataIndex: 'type',
                render: type => {
                    let color = type * 1 === 0 ? "geekblue" : "green"
                    return <span>
                        <Tag color={color} key={type}>
                            {type * 1 === 0 ? "游客" : "管理员"}
                        </Tag>
                    </span>
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    // console.log(text)
                    return <span>
                        <span onClick={this.update.bind(this, text)}>更新 </span>
                        <Divider type="vertical" />
                        <span onClick={() => {
                            console.log(record.id)
                            deleteUser(record.id)
                            this.getUserList()
                        }}>删除</span>
                    </span>

                },
            },
        ]
    }

    componentDidMount() {
        this.getUserList()
    }
    //数据二次处理  给数据添加key值
    formatData(dataSource) {
        const temp = []
        dataSource.forEach((ite, ind) => {
            temp.push({
                key: ite.id,
                ...ite
            })
        })
        this.setState({
            userList: temp
        })
    }
    //获取数据
    async getUserList() {
        const result = await getUserList()
        this.formatData(result.data.result)
    }

    //点击更新到input框   编辑
    update(text) {
        console.log(text)
        this.setState({
            modelData: text
        }, () => {
            const { username, password, type,id } = this.state.modelData
            this.showModal()
            this.props.form.setFieldsValue({
                username,
                password,
                type,
                id
            })
        })
    }
    //点击更新弹框出现
    showModal = (el) => {
        this.setState({
            visible: true,
        });
    };


    //弹框出现后的确定
    handleOk = e => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                updataUser(values).then(res=>{
                    message.success(res.data.msg)
                    this.getUserList()
                })
            }
        })
        this.setState({
            visible: false,
        });
    };
    //点击弹框消失
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { userList, columns } = this.state
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Table columns={columns} dataSource={userList} />
                <Modal
                    title="更新用户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                        <Form.Item label="用户ID" >
                            {getFieldDecorator('id')(<Input disabled/>)}
                        </Form.Item>
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
                                getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择身份!' }],
                                })(<Select >
                                    <Option value="0">游客</Option>
                                    <Option value="1">管理员</Option>
                                </Select>)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default show;