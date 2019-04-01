import React, { Component } from 'react';
import {
    Form, Icon, Input, Button,
} from 'antd';

import image from './logo.png';
import './logo.less';

const Item = Form.Item;

@Form.create()
class Logo extends Component {
    login = (e) => {
        e.preventDefault();
    }
    validator = (rule, value, callback) => {
        const length = value && value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if(!value){
            callback(`必须输入密码`);
        }else if(length < 4){
            callback('密码必须大于4位');
        }else if(length > 12){
            callback('密码必须小于12位');
        }else if(!pwdReg.test(value)){
            callback('密码必须是英文、数组或下划线组成');
        }else{
            callback();
        }
    }
    render() {
        console.log(this.props.form)
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='logo'>
                <header className='logo-header'>
                    <img src={image} alt="logo" />
                    <h2>React后台登录管理项目</h2>
                </header>
                <section className='logo-content'>
                    <h3>用户登录</h3>
                    <Form onSubmit={this.login} className="logo-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true, whitespace: true, message: '必须输入用户名'
                                },
                                { min: 4, message: '用户名不能小于4位' },
                                { max: 12, message: '用户名不能大于12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成' }
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </Item>
                        <Item>
                            {/* {getFieldDecorator('password', {
                                rules: [{
                                    required: true, whitespace: true, message: '必须输入密码'
                                },
                                { min: 4, message: '密码不能小于4位' },
                                { max: 12, message: '密码不能大于12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数组或下划线组成' }
                                ]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )} */}
                            {getFieldDecorator('password', {
                                rules: [
                                    {validator: this.validator}
                                ]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )} 
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="logo-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
// Form.create({ name: 'normal_login' })(Logo)
export default Logo;