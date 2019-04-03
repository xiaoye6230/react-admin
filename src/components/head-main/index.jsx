import React, { Component } from 'react'
import { Row, Col, Modal } from 'antd';
import { withRouter } from 'react-router-dom'

import MyButton from '../my-button';
import { removeItem } from '../../utils/storage-utils';
import memory from '../../utils/memory-utils';

import './index.less';

@withRouter
class HeadMain extends Component {
    logout = () => {
        Modal.confirm({
            title: '您确定要退出登录吗？',
            onOk: () => {
                memory.user = {};
                removeItem();
                this.props.history.replace('./login')
            },
            okText: '确认',
            cancelText: '取消'
        })
    }
    render() {
        const username = memory.user.username;
        return (
            <div className='head-main'>
                <Row className='head-top'>
                    <span>欢迎, {username}</span>
                    <MyButton onClick={this.logout}>退出</MyButton>
                </Row>
                <Row className='head-bottom'>
                    <Col span={4} className='head-left'>用户管理</Col>
                    <Col span={20} className='head-right'>
                        <span>2019-04-03 15:19:47</span>
                        <img src='http://api.map.baidu.com/images/weather/day/qing.png' alt='天气' />
                        <span>多云</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default HeadMain;