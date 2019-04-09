import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import menuList from '../../config/menu-config'
import image from '../../assets/images/logo.png';

import './index.less';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

@withRouter
class LeftNav extends Component {
    static propTypes = {
        opacity: PropTypes.number.isRequired,
    }
    constructor(props) {
        super(props);
        const openKeys = [];
        this.menus = this.createMenu(menuList, openKeys);
        this.state = {
            openKeys
        }
    }

    createItem(menu) {
        return <Item key={menu.key}>
            <Link to={menu.key}>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
            </Link>
        </Item>
    }

    createMenu(menuList, openKeys) {
        const { pathname } = this.props.location;
        return menuList.map((menu) => {
            const children = menu.children;
            if (children) {
                return <SubMenu
                    key={menu.key}
                    title={<Link to='/products'><span><Icon type={menu.icon} /><span>{menu.title}</span></span></Link>}
                >
                    {
                        children.map((item) => {
                            if (pathname === item.key) {
                                openKeys.push(menu.key);
                            }
                            return this.createItem(item);
                        })
                    }
                </SubMenu>
            } else {
                return this.createItem(menu);
            }
        })
    }
    handleOpenChange = (openKeys) => {
        this.setState({openKeys})
    }

    //收起打开的二级菜单
    handleClick = () => {
        this.setState({
            openKeys: []
        })
    }
    render() {
        const { location: { pathname }, opacity } = this.props;
        return (
            <Fragment>
                <Link to='/home' className="logo" onClick={this.handleClick}>
                    <img src={image} alt="logo" />
                    <h2 style={{ opacity }}>硅谷后台</h2>
                </Link>
                <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.handleOpenChange}>
                    {this.menus}
                    {/* <Item key="/home">
                        <Link to='./home'>
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
                    </Item>
                    <SubMenu
                        key="sub1"
                        title={<Link to='/products'><span><Icon type="appstore" /><span>商品</span></span></Link>}
                    >
                        <Item key="2">
                            <Link to='./category'>
                                <Icon type="bars" /><span>品类管理</span>
                            </Link>
                        </Item>
                        <Item key="3">
                            <Link to='./product'>
                                <Icon type="tool" /><span>商品管理</span>
                            </Link>
                        </Item>
                    </SubMenu>
                    <Item key="/user">
                        <Link to='./user'>
                            <Icon type="user" />
                            <span>用户管理</span>
                        </Link>
                    </Item>
                    <Item key="/role">
                        <Link to='./role'>
                            <Icon type="safety" />
                            <span>权限管理</span>
                        </Link>
                    </Item>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="area-chart" /><span>图形图表</span></span>}
                    >
                        <Item key="/charts/bar"><Icon type="bar-chart" /><span>柱形图</span></Item>
                        <Item key="/charts/line"><Icon type="line-chart" /><span>折线图</span></Item>
                        <Item key="/charts/pie"><Icon type="pie-chart" /><span>饼图</span></Item>
                    </SubMenu> */}
                </Menu>
            </Fragment>
        )
    }
}
export default LeftNav;