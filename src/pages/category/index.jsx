import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
import { Table } from 'antd';

export default class Category extends Component {
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    }];
    return (
      <div>
        <Card
          title="一级分类列表"
          extra={<Button type='primary'><Icon type='plus' />添加品类</Button>}
        >
          <Table
            columns={columns}
            dataSource={data}
            bordered
          />
        </Card>
      </div>
    )
  }
}
