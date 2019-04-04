import React, { Component } from 'react'
import { Row, Col, Modal, message } from 'antd';
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs';

import { reqWeather } from '../../api';
import MyButton from '../my-button';
import { removeItem } from '../../utils/storage-utils';
import memory from '../../utils/memory-utils';
import menuList from '../../config/menu-config';

import './index.less';
@withRouter
class HeadMain extends Component {
    state = {
        sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png',
        weather: '小雨'
    }
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

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
        }, 1000)
        reqWeather('深圳')
            .then((res) => {
                this.setState({
                    weatherImg: res.weatherImg,
                    weather: res.weather
                })
            })
            .catch((err) => message.error(err, 2))
    }

    componentWillUpdate() {
        clearImmediate(this.intervalId);
    }

    getTitle = () => {
        const { pathname } = this.props.location;
        for (let i = 0, length = menuList.length; i < length; i++) {
            const menu = menuList[i];
            const children = menu.children;
            if (children) {
                for (let j = 0, length = children.length; j < length; j++) {
                    const item = children[j];
                    if (item.key === pathname) {
                        return item.title;
                    }
                }
            } else {
                if (pathname === menu.key) {
                    return menu.title;
                }
            }
        }
    }

    render() {
        const { sysTime, weatherImg, weather } = this.state;
        const username = memory.user.username;
        const title = this.getTitle();
        return (
            <div className='head-main'>
                <Row className='head-top'>
                    <span>欢迎, {username}</span>
                    <MyButton onClick={this.logout}>退出</MyButton>
                </Row>
                <Row className='head-bottom'>
                    <Col span={4} className='head-left'>{title}</Col>
                    <Col span={20} className='head-right'>
                        <span>{sysTime}</span>
                        <img src={weatherImg} alt='天气' />
                        <span>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default HeadMain;