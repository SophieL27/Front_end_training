import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,message} from 'antd';
import React from 'react';
import './rightCol.css';
import  {history} from 'umi';

class RightCol extends React.Component{
  constructor(props) {
    super(props);
    console.log("constructor");
  }


  onFinish=(values)=>{
    console.log("onFinish",values);
    console.log(values);
    let url2 = "http://1.94.134.166:8805/login?";
    url2 = url2 +"username="+String(values.Username);
    url2 = url2 +"&password="+String(values.password);
    console.log(url2);
    // let url = "http://1.94.134.166:8805/login?username=admin&password=123456";
    fetch(url2,{method:'POST'})
      .then((response) => response.json())
      .then((res)=>{
        console.log(res);
        if(res.code!=0){
          message.error(res.msg);
          return;
        }
        localStorage.setItem('Authorization',`Bearer ${res.data.token}`);
        message.info(res.msg);
        history.push('/Demo2');
      });
  }

  render(){
    console.log("render");
    return(
      <>
        <div id="login_title">医院陪护系统管理平台</div>
        <div id="login_content">
          <Form
            name="normal_login"
            className="login-form"
            // 设置表单的默认值
            initialValues={{
              Username:"admin",
              password:"123456"
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="Username"
              // label="用户名"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item
              name="password"
              // label="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入你的密码!',
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入你的密码"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="btnLogin">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    )
  }
}



const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};
export default RightCol;
