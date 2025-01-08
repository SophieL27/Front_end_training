import React, { Fragment } from 'react';
import { Button, Drawer, Table, Space, Popconfirm, message } from 'antd';
import EditUser from './EditUser';
import AddUser from './AddUser';
class Demo4 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      tableData: [],
      editvisible: false,
      currentUser: {},
    };
  }
  refreshData = () => {
    console.log('execute refreshData');
    let url = 'http://1.94.134.166:8805/user/page';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        const tableData = res.data.records;
        this.setState({ tableData });
      });
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.refreshData();
  }

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
      title: '用户名字',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '电话',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        //console.log(record);
        const popComfirmTitle = '你是否要删除' + record.username + '这条记录？';

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
      currentUser: data,
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
    let url = 'http://1.94.134.166:8805/user/' + record.userId;

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
          title="添加用户"
          placement="right"
          width={'50%'}
          onClose={this.onClose}
          open={this.state.visible}
        >
          <AddUser refresh={this.refreshData} colseDrawer={this.onClose} />
        </Drawer>
        <Drawer
          title="编辑用户"
          placement="left"
          width={'50%'}
          onClose={this.onEditDrawerClose}
          open={this.state.editvisible}
          //destroyOnClose();
        >
          <EditUser
            refresh={this.refreshData}
            colseDrawer={this.onEditDrawerClose}
            currentData={this.state.currentUser}
          />
        </Drawer>
      </Fragment>
    );
  }
}

export default Demo4;
