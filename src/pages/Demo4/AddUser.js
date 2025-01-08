import { Button, Form, Input } from 'antd';

import React, { Component } from 'react';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  onFinish = (values) => {
    console.log('componentDidMount');
    let url = 'http://1.94.134.166:8805/user';
    values.userId = 0;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        const { code = 0 } = res;
        if (code == 0) {
          this.props.refresh();
          this.props.colseDrawer();
          this.formRef.current.resetFields();
        }
      });
  };
  render() {
    console.log(this.props);
    return (
      <>
        <Form
          name="normal_new"
          className="new-form"
          initialValues={{}}
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Form.Item
            name="username"
            label={'用户名字'}
            rules={[
              {
                required: true,
                message: '请输入你的名字，长度3-20!',
              },
              {
                pattern: /^[a-zA-Z\u4e00-\u9fff]{3,20}$/,
                message: '用户名字只能输入中文和英文!',
              },
            ]}
          >
            <Input size="large" placeholder="请输入用户名字，长度3-20" />
          </Form.Item>
          <Form.Item
            name="telephone"
            label={'电话'}
            rules={[
              {
                required: true,
                message: '请输入联系人电话!',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号码!',
              },
            ]}
          >
            <Input size="large" placeholder="请输入你的电话" />
          </Form.Item>
          <Form.Item
            name="email"
            label={'邮件'}
            rules={[
              {
                required: true,
                message: '请输入你的邮件!',
              },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '邮件格式错误!',
              },
            ]}
          >
            <Input size="large" placeholder="请输入你的邮件" />
          </Form.Item>
          <Form.Item
            name="sex"
            label={'性别'}
            rules={[
              {
                required: true,
                message: '请输入你的性别(男0/女1)!',
              },
              {
                pattern: /^^0|1$/,
                message: '性别只能为(男/女)!!',
              },
            ]}
          >
            <Input size="large" placeholder="请输入你的性别(男0/女1)!" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btnNew">
              新增
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
export default AddUser;
