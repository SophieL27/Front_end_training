import React, { Fragment, useState } from 'react';
import { withRouter, Switch, history } from 'umi';
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import routerConfig from '../../config/router.config';

const { SubMenu } = Menu;

const getIcon = (iconName) => {
  const res = React.createElement(Icon[iconName], {
    style: { fontSize: '16px' },
  });
  return res;
};

const getSubMenu = (routesData) => {
  routesData.map((item) => {
    return <Menu.Item key={item.path}>{item.name}</Menu.Item>;
  });
};

const getMenu = (routesData) => {
  const menuData = [];
  for (let i = 0; i < routesData.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(routesData[i], 'routes')) {
      menuData.push(
        <SubMenu
          key={routesData[i].path}
          title={routesData[i].name}
          icon={getIcon(routesData[i].icon)}
        >
          {getSubMenu(routesData[i].routes)}
        </SubMenu>,
      );
    } else {
      menuData.push(
        <Menu.Item key={routesData[i].path} icon={getIcon(routesData[i].icon)}>
          {routesData[i].name}
        </Menu.Item>,
      );
    }
  }
  return menuData;
};
const CreateMenu = () => {
  const [levelOne] = routerConfig;
  const { routes } = levelOne;
  return <Fragment>{getMenu(routes)}</Fragment>;
};

export default withRouter(({ children, location }) => {
  const [current, setCurrent] = useState('');
  const handleClick = (e) => {
    history.push(e.key);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        {CreateMenu()}
      </Menu>
      <div>
        <Switch location={location}>{children.props.children}</Switch>
      </div>
    </div>
  );
});
