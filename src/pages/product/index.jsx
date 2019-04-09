import React, { Component, Fragment } from 'react';
import { Card, Table, Button, Input, Icon, Select, message } from 'antd';
import { Link } from 'react-router-dom';

import MyButton from '../../components/my-button';
import { reqGetProuducts } from '../../api';

const Option = Select.Option;

export default class Product extends Component {
  state = {
    products: [],
    total: 0
  }

  getProducts = async (pageNum, pageSize = 2) => {
    const result = await reqGetProuducts(pageNum, pageSize);
    if (result.status === 0) {
      this.setState({
        products: result.data.list,
        total: result.data.total
      })
    } else {
      message.error(result.msg);
    }
  }

  componentDidMount() {
    this.getProducts(1)
  }
  render() {
    const { products, total } = this.state;

    const columns = [{
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '状态',
      // dataIndex: 'address',
      key: 'status',
      render: () => {
        return <Fragment>
          <Button type='primary'>下架</Button>
          &nbsp;&nbsp;在售
        </Fragment>
      }
    }, {
      title: '操作',
      // dataIndex: 'address',
      key: 'operate',
      render: () => {
        return <Fragment>
          <MyButton>详情</MyButton>
          <MyButton>修改</MyButton>
        </Fragment>
      }
    }
    ];
    return (
      <Card
        title={
          <Fragment>
            <Select value='0'>
              <Option key='0' value='0'>根据商品名称</Option>
              <Option key='1' value='1'>根据商品描述</Option>
            </Select>
            <Input placeholder='关键字' style={{ width: 200, margin: '0 10px' }}></Input>
            <Button type='primary'>搜索</Button>
          </Fragment>
        }
        extra={<Link to='/product/saveUpdate'><Button type='primary'><Icon type='plus' />添加产品</Button></Link>}
        style={{ width: '100%' }}
      >
        <Table
          dataSource={products}
          columns={columns}
          bordered
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['2', '4', '6'],  //指定每页可以显示多少条
            defaultPageSize: 2,      //默认显示每页的条数
            showQuickJumper: true,   //跑到指定页
            total,
            onChange: this.getProducts,
            onShowSizeChange: this.getProducts
          }}
          loading={false}
          rowKey='_id'
        />
      </Card>
    )
  }
}


