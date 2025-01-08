const routerConfig = [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        exact: true,
        path: '/Demo1',
        name: 'Demo1',
        component: '@/pages/Demo1/index',
        icon: 'SettingOutlined',
      },
      {
        exact: true,
        path: '/Demo2',
        name: 'Demo2',
        component: '@/pages/Demo2/index',
        icon: 'AppstoreOutlined',
      },
      {
        exact: true,
        path: '/Demo3',
        name: 'Demo3',
        component: '@/pages/Demo3/index',
        icon: 'BarChartOutlined',
      },
      {
        exact: true,
        path: '/Demo4',
        name: 'Demo4',
        component: '@/pages/Demo4/index',
        icon: 'BarChartOutlined',
      },
    ],
  },
];
export default routerConfig;
