import React, { Component } from 'react';
import { Card, Form, Icon, Input, Cascader, InputNumber, Button, message } from 'antd';

import './index.less';
import { reqGetCategories, reqAddProduct } from '../../api';
import RichTextEditor from './richTextEditor';
import PicturesWall from './picturesWall';

const Item = Form.Item;
@Form.create()
class SaveUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
    this.richTextEditor = React.createRef();
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
  };

  goBack = () => {
    this.props.history.goBack();
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, desc, price, category } = values;
        const detail = this.richTextEditor.current.state.editorState.toHTML();
        let pCategoryId, categoryId;
        if (category.length === 1) {
          pCategoryId = '0';
          categoryId = category[0];
        } else {
          pCategoryId = category[0];
          categoryId = category[1];
        }
        const result = await reqAddProduct({ name, desc, price, pCategoryId, categoryId, detail });
        if (result.status === 0) {
          message.success('商品添加成功')
          this.props.history.goBack();
        } else {
          message.error(result.msg);
        }
      }
    })
  }

  //加载二级分类数据
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    this.getCategories(targetOption.value);
  }
  getCategories = async (parentId) => {
    const result = await reqGetCategories(parentId);
    if (result.status === 0) {
      if (parentId === '0') {
        this.setState({
          options: result.data.map((item) => {
            return {
              label: item.name,
              value: item._id,
              isLeaf: false
            }
          })
        })
      } else {
        this.setState({
          options: this.state.options.map((option) => {
            if (option.value === parentId) {
              option.children = result.data.map((item) => {
                return {
                  label: item.name,
                  value: item._id
                }
              })
              option.loading = false;
              option.isLeaf = true;
            }
            return option;
          })
        })
      }
    } else {
      message.error(result.msg)
    }
  }

  componentDidMount() {
    this.getCategories('0')
  }

  composeCategory(pCategoryId, categoryId) {
    let category = null;
    if (pCategoryId === '0') {
      category = [categoryId];
    } else {
      category = [pCategoryId, categoryId];
    }
    return category;
  }
  render() {
    const { options } = this.state;
    const { form: { getFieldDecorator }, location: { state } } = this.props;
    console.log(state);
    return (
      <Card
        title={<div className='arrowLeft'>
          <Icon type='arrow-left' className='goBack' onClick={this.goBack} />&nbsp;&nbsp;
        <span>{state ? '修改商品' : '添加商品'}</span>
        </div>}
      >
        <Form {...this.formItemLayout} onSubmit={this.submit}>
          <Item label='商品名称'>
            {
              getFieldDecorator('name', {
                rules: [{ required: true, whiteSpace: true, message: '商品名称不能为空' }],
                intialValue: state ? state.name : ''
              })(
                <Input placeholder='请输入商品名称'></Input>
              )
            }
          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator('desc', {
                rules: [{ required: true, whiteSpace: true, message: '商品描述不能为空' }],
                intialValue: state ? state.desc : ''
              })(
                <Input placeholder='请输入商品描述'></Input>
              )
            }
          </Item>
          <Item
            label='商品分类'
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 5 },
            }}
          >
            {
              getFieldDecorator(
                'category',
                {
                  rules: [{ required: true, message: '请选择商品分类' }],
                  intialValue: state ? this.composeCategory(state.pCategoryId, state.categoryId) : []
                }
              )(
                <Cascader
                  options={options}
                  placeholder='请选择分类'
                  changeOnSelect
                  loadData={this.loadData}
                />
              )
            }

          </Item>
          <Item
            label='商品价格'
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 3 },
            }}
          >
            {
              getFieldDecorator(
                'price',
                {
                  rules: [{ required: true, message: '请选择商品价格' }],
                  intialValue: state ? state.price : ''
                }
              )(
                <InputNumber
                  className='saveInput'
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                />
              )
            }
          </Item>
            {
              state ? <Item label='商品图片'>
                <PicturesWall _id={state._id} imgs={state.imgs} />
              </Item> : null
            }
          <Item
            label='商品详情'
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 21 },
            }}
          >
            <RichTextEditor ref={this.richTextEditor} />
          </Item>
          <Item>
            <Button type='primary' className='saveButton' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default SaveUpdate;
