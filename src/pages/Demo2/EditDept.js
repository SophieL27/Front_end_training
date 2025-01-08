import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';

class EditDept extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();


  }
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("nextProps",nextProps);
    if(nextProps.currentData.deptId!=this.props.currentData.deptId)
    {
      this.formRef.current.setFieldsValue(nextProps.currentData);
      this.setState({
        currentData: nextProps.currentData,
      })

    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.formRef.current.setFieldsValue(this.props.currentData)
    this.setState({
      currentData: this.props.currentData,
    })
  }



  onFinish = (values) => {
    console.log("componentDidMount");
    let url = "http://1.94.134.166:8805/dept";
    console.log(values);
    console.log(this.state.currentData);
    const sendData = {...this.state.currentData, ...values};
    console.log("sendData", sendData);

    fetch(url,
      {
        method:'PUT',
        body:JSON.stringify(sendData),
        headers:{
          'Content-Type':'application/json',
          Authorization: localStorage.getItem('Authorization'),
        },
      }
    )
      .then((response) => response.json())
      .then((res)=>{
        console.log(res);
        const {code=0}=res;
        if(code==0){
          this.props.refresh();
          this.props.colseDrawer();
          //this.formRef.current.resetFields();
        }

      })
  }
  render(){
    console.log(this.props);
    return(
      <>
        <Form
          name="normal_new"
          className="new-form"
          initialValues={{

          }}
          onFinish={this.onFinish}
          ref={this.formRef}
        >


          <Form.Item
            name="deptName"
            label={"部门名称"}
            rules={[
              {
                required: true,
                message: '请输入你的部门名称，长度3-20!',
              },
              {
                pattern: /^[a-zA-Z\u4e00-\u9fff]{3,20}$/,
                message:'部门名称只能输入中文和英文!'
              }
            ]}
          >
            <Input
              size="large"
              placeholder="请输入部门名称，长度3-20" />
          </Form.Item>
          <Form.Item
            name="deptPy"
            label={"部门拼音"}
            rules={[
              {
                required: true,
                message: '请输入你的部门拼音，长度3-40位!',
              },
              {
                pattern: /^[a-zA-Z]{3,40}$/,
                message:'部门拼音只能输入拼音!'
              }
            ]}
          >
            <Input
              size="large"
              placeholder="请输入部门拼音，长度3-40位" />
          </Form.Item>
          <Form.Item
            name="phone"
            label={"电话"}
            rules={[
              {
                required: true,
                message: '请输入联系人电话!',
              },
              {
                pattern:/^1[3-9]\d{9}$/,
                message:'请输入正确的手机号码!'
              }
            ]}
          >
            <Input
              size="large"
              placeholder="请输入你的电话" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btnNew">
              修改
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}
export default EditDept;
