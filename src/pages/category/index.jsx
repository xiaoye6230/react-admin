import React, { Component } from 'react';
import { Card, Button, Icon, Modal, Table, message } from 'antd';
import AddCategoryForm from './add-category-form';
import MyButton from '../../components/my-button';
import { reqGetCategories, reqAddCategory } from '../../api';

import './index.less';
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isShowAdd: false
    }
    this.createAddForm = React.createRef();
  }
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name'
    },
    {
      title: '操作',
      className: 'operator',
      dataIndex: 'operator',
      render: text => <div>
        <MyButton>修改名称</MyButton>
        <MyButton>查看其子品类</MyButton>
      </div>
    }
  ];
  //请求分类数据的方法
  getCategories = async (parentId) => {
    const result = await reqGetCategories(parentId);
    if (result.status === 0) {
      this.setState({
        categories: result.data
      })
    } else {
      message.error(result.msg);
    }
  }
  componentDidMount() {
    this.getCategories('0');
  }
  addCategory = () => {
    const { validateFields } = this.createAddForm.current.props.form;
    // 表单校验的方法
    validateFields(async (err, values) => {
      if (!err) {
        // 校验成功  --> 发送请求 添加分类数据 、隐藏对话框、提示添加分类成功
        const { parentId, categoryName } = values;
        const result = await reqAddCategory(parentId, categoryName);
        if (result.status === 0) {          
          message.success('添加分类成功');
          this.setState({
            isShowAdd: false,
            categories: [...this.state.categories, result.data]
          })
        } else {
          message.error(result.msg);
        }
      } else {
        // 校验失败 -- 啥也不做

      }
    })
  }

  changeModal = (isShow) => {
    return () => {
      this.setState({
        isShowAdd: isShow
      })
    }
  }
  render() {
    const { categories, isShowAdd } = this.state;
    return (
      <Card
        title="一级分类列表"
        extra={<Button type='primary' onClick={this.changeModal(true)}><Icon type='plus' />添加品类</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          pagination={
            {
              showSizeChanger: true,
              pageSizeOptions: ['2', '4', '6'],  //指定每页可以显示多少条
              defaultPageSize: 2,      //默认显示每页的条数
              showQuickJumper: true   //跑到指定页
            }
          }
        />
        <Modal
          title='添加分类'
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.changeModal(false)}
          onText='确认'
          cancelText="取消"
        >
          <AddCategoryForm categories={categories} wrappedComponentRef={this.createAddForm} />
        </Modal>
      </Card>
    )
  }
}
