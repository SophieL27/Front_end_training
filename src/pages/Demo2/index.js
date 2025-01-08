import React, { Fragment } from 'react';
import { Button, Drawer, Table, Space, Popconfirm, message } from 'antd';

import AddDept from './AddDept';

import EditDept from './EditDept';

class Demo2 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      tableData: [],
      editvisible: false,
      currentDept: {},
    };
  }
  refreshData = () => {
    console.log('execute refreshData');
    let url = 'http://1.94.134.166:8805/dept/list?parentId=0';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        const { data } = res;
        // this.state.tableData=res.data;
        this.setState({ tableData: data });
      });
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.refreshData();
  }
  dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  columns = [
    {
      title: '序号',
      key: 'index',
      render: (_, record, index) => {
        /*
        console.log("index");
        console.log("text");
        console.log("record");
        */
        return index + 1;
      },
    },

    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
    },
    {
      title: '部门拼音',
      dataIndex: 'deptPy',
      key: 'deptPy',
    },
    {
      title: '联系人电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        //console.log(record);
        const popComfirmTitle = '你是否要删除' + record.deptName + '这条记录？';

        return (
          <Space size="middle">
            <a onClick={() => this.handleEditDrawer(record)}>编辑</a>
            <Popconfirm
              title={popComfirmTitle}
              onConfirm={() => this.deleteConfirm(record)}
              onCancel={this.deleteCancel}
              okText="Yes"
              cancelText="No"
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  handleEditDrawer = (data) => {
    this.setState({
      editvisible: true,
      currentDept: data,
    });
  };
  handleOpenDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };
  onEditDrawerClose = () => {
    this.setState({ editvisible: false });
  };
  deleteConfirm = (record) => {
    console.log('componentDidMount');
    let url = 'http://1.94.134.166:8805/dept/' + record.deptId;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        const { code = 0, msg = '' } = res;
        if (code == 0) {
          this.refreshData();
          message.info(msg);
        }
      });
  };
  deleteCancel = () => {};

  render() {
    return (
      <Fragment>
        <Button type="primary" onClick={this.handleOpenDrawer}>
          新增
        </Button>
        <Table dataSource={this.state.tableData} columns={this.columns} />;
        <Drawer
          title="添加部门"
          placement="right"
          width={'50%'}
          onClose={this.onClose}
          open={this.state.visible}
        >
          <AddDept refresh={this.refreshData} colseDrawer={this.onClose} />
        </Drawer>
        <Drawer
          title="编辑部门"
          placement="left"
          width={'50%'}
          onClose={this.onEditDrawerClose}
          open={this.state.editvisible}
          //destroyOnClose();
        >
          <EditDept
            refresh={this.refreshData}
            colseDrawer={this.onEditDrawerClose}
            currentData={this.state.currentDept}
          />
        </Drawer>
      </Fragment>
    );
  }
}

export default Demo2;
