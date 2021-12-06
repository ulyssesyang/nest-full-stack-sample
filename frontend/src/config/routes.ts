import {
  Home as HomeIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

import { Home } from '../pages/Home';
import { Favorites } from '../pages/Favorites';

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
    key: 'router-favorites',
    title: 'Favorites',
    description: 'Favorites',
    component: Favorites,
    path: '/favorites',
    isEnabled: true,
    icon: FavoriteIcon,
  },
];

export default routes;
