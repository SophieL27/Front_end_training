import React, { Fragment } from 'react';
import { Layout, Popconfirm, Space, Table, Tag } from 'antd';
import { Col, Row } from 'antd';
import ReactDOM from 'react-dom';
import { Bar, RadialBar } from '@ant-design/plots';
import { message } from 'antd';
import img1 from './background2.jpeg';

import img3 from './bottom2.png';
import { Content, Footer, Header } from 'antd/es/layout/layout';
// 定义 Demo3 类组件
class Demo3 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      plotData: [],
    };
  }
  componentDidMount() {
    this.getAppInfo();
  }
  getAppInfo = () => {
    let url =
      'http://1.94.134.166:8805/appUseInfo/state?beginData=2024-01-01&endData=2024-11-01&stateType=ByMonth';

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        this.setState({ plotData: data.data });
      });
  };

  render() {
    const config1 = {
      title: '2024-01-01至2024-11-01 各应用使用时长排行',
      theme: 'classic',
      autoFit: true,
      data: this.state.plotData,
      xField: 'appName',
      yField: 'useTime',
      slider: {
        y: {},
      },

      sort: {
        reverse: true,
      },
      label: {
        transform: [
          {
            type: 'contrastReverse',
          },
        ],
      },

      percent: true,
    };
    const config2 = {
      data: this.state.plotData,
      xField: 'appName',
      yField: 'useTime',
      maxAngle: 90,
      radius: 1,
      innerRadius: 0.2,
      style: {
        radius: 26, // 圆角
      },
      scale: {
        y: { nice: true },
      },
      percent: true,
    };
    const columns = [
      {
        title: 'appName',
        dataIndex: 'appName',
        key: 'appName',
      },
      {
        title: 'useTime',
        dataIndex: 'useTime',
        key: 'useTime',
      },
      {
        title: 'stateYear',
        dataIndex: 'stateYear',
        key: 'stateYear',
      },
      {
        title: 'stateMonth',
        dataIndex: 'stateMonth',
        key: 'stateMonth',
      },
    ];

    return (
      <Layout
        style={{
          backgroundImage: `url(${img1})`,
          height: '100vh',
          backgroundSize: 'cover',
        }}
      >
        <Header></Header>
        <Content>
          <div>
            <Row>
              <Col span={8}>
                <Fragment>
                  <Bar {...config1} />
                </Fragment>
              </Col>
              <Col span={8}>
                <Table columns={columns} dataSource={this.state.plotData} />
              </Col>
              <Col span={8}>
                <RadialBar {...config2} />
              </Col>
            </Row>
          </div>
          <div>
            <img
              src={img3}
              style={{ width: '100%', height: 'auto' }}
              alt="底部图片"
            />
          </div>
        </Content>
      </Layout>
    );
  }
}

// 渲染 Demo3 组件到 DOM 中
//ReactDOM.render(<DemoBar />, document.getElementById('container'));

export default Demo3;
