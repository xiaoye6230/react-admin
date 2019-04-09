import React, { Component } from 'react';
import { Card, Form, Icon, Input, Cascader, InputNumber, Button, message } from 'antd';

import './index.less';
import { reqGetCategories } from '../../api';
import RichTextEditor from './richTextEditor'

const Item = Form.Item;

@Form.create()
class SaveUpdate extends Component {
  state = {
    options: []
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
  render() {
    const { options } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Card
        title={<div className='arrowLeft'><Icon type='arrow-left' className='goBack' onClick={this.goBack} />&nbsp;&nbsp;<span>添加商品</span></div>}
      >
        <Form {...this.formItemLayout}>
          <Item label='商品名称'>
            {
              getFieldDecorator('name', {
                rules: [{ required: true, whiteSpace: true, message: '商品名称不能为空' }]
              })(
                <Input placeholder='请输入商品名称'></Input>
              )
            }
          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator('desc', {
                rules: [{ required: true, whiteSpace: true, message: '商品描述不能为空' }]
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
                  rules: [{ required: true, message: '请选择商品分类' }]
                }
              )(
                <Cascader
                  options={options}
                  onChange={this.onChange}
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
                  rules: [{ required: true, message: '请选择商品价格' }]
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
            <Button type='primary' className='saveButton'>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default SaveUpdate;
