import React, { Fragment } from 'react';
import { Button } from 'antd';
import { Col, Row } from 'antd';

import RightCol from './rightCol';

import './demo1.css';
import './rightCol.css';

import img1 from './loginImg.81783432.png';
class Demo1 extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col span={12}>
            <img src={img1} className="imgstyle" />
          </Col>
          <Col span={12}>
            <RightCol />
          </Col>
        </Row>
        <Button type="primary">Primary Button</Button>
      </Fragment>
    );
  }
}

export default Demo1;
