import React, { Component } from 'react';
import { Card, Button, Icon, Modal, Table, message } from 'antd';
import AddCategoryForm from './add-category-form';
import UpdateCategoryForm from './update-category-form';
import MyButton from '../../components/my-button';
import { reqGetCategories, reqAddCategory, reqUpdateCategory } from '../../api';

import './index.less';
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],    //一级分类
      isShowAdd: false,  //添加分类对话框显示
      isShowUpdate: false,  //修改分类名称对话框显示
      category: {}
    }
    this.createAddForm = React.createRef();
    this.createUpdateForm = React.createRef();
  }
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name'
    },
    {
      title: '操作',
      className: 'operator',
      // dataIndex: 'operator',
      render: category => {
        return <div>
          <MyButton onClick={this.showUpdateForm(category)}>修改名称</MyButton>
          <MyButton>查看其子品类</MyButton>
        </div>
      }
    }
  ];

  showUpdateForm = (category) => {
    return () => {
      this.setState({
        category
      })
      this.changeModal('isShowUpdate', true)();
    }
  }
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

  //修改分类数据方法
  updateCategory = () => {
    const { validateFields } = this.createUpdateForm.current.props.form;
    validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values;
        const categoryId = this.state.category._id;
        const result = await reqUpdateCategory(categoryId, categoryName);
        if (result.status === 0) {
          // 隐藏对话框、提示成功、修改显示的分类名称
          message.success('更新分类名称成功~');
          this.setState({
            isShowUpdate: false,
            categories: this.state.categories.map((category) => {
              if (category._id === categoryId) return {...category, name: categoryName};
              return category;
            })
          })
        } else {
          message.error(result.msg);
        }
      }
    })
  }

  changeModal = (name, isShow) => {
    return () => {
      this.setState({
        [name]: isShow
      })
    }
  }
  render() {
    const { categories, isShowAdd, isShowUpdate, category } = this.state;
    return (
      <Card
        title="一级分类列表"
        extra={<Button type='primary' onClick={this.changeModal('isShowAdd', true)}><Icon type='plus' />添加品类</Button>}
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
          rowKey='_id'
        />
        <Modal
          title='添加分类'
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.changeModal('isShowAdd', false)}
          onText='确认'
          cancelText="取消"
        >
          <AddCategoryForm categories={categories} wrappedComponentRef={this.createAddForm} />
        </Modal>

        <Modal
          title='修改分类名称'
          visible={isShowUpdate}
          onOk={this.updateCategory}
          onCancel={this.changeModal('isShowUpdate', false)}
          onText='确认'
          cancelText="取消"
          width={300}
        >
          <UpdateCategoryForm categoryName={category.name} wrappedComponentRef={this.createUpdateForm} />
        </Modal>
      </Card>
    )
  }
}
