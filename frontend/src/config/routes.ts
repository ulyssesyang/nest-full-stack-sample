import {
  Home as HomeIcon,
  SettingsOutlined as SettingsIcon,
} from '@mui/icons-material';

import { Home } from '../pages/Home';

import { Route } from '../types/Route';

const routes: Array<Route> = [
  {
    key: 'router-home',
    title: 'Home',
    description: 'Home',
    component: Home,
    path: '/',
    isEnabled: true,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    key: 'router-settings',
    title: 'Settings',
    description: 'Account Settings',
    path: '/account/settings',
    isEnabled: true,
    icon: SettingsIcon,
  },
];

export default routes;
