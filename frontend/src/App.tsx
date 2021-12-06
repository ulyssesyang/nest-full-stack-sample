import { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { Layout } from './components/Layout';
import { PageDefault } from './components/PageDefault';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { AppContext, ThemeModeContext } from './contexts';
import { User } from './types/User';
import Debounce from './hooks/useDebounce';

import { routes } from './config';
import { Route as AppRoute } from './types';
import { getAppTheme } from './styles/theme';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from './utils/constants';

function App() {
  const history = useHistory();
  const [mode, setMode] = useState<typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME>(DARK_MODE_THEME);

  const userLocalStorage = window.localStorage.getItem('user');
  const [user, setUser] = useState(!!userLocalStorage ? JSON.parse(userLocalStorage) : {});

  const userMode = useMemo(
    () => ({
      user,
      updateUser: (userInfo: User) => {
        const newUser = {...user, ...userInfo};
        setUser(newUser);
        window.localStorage.setItem('user', JSON.stringify(newUser));
        history?.push('/');
      }
    }),[user, history]
  );

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME));
      },
    }),
    []
  );

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  function searchLocationWeather(event) {
    console.log('location :>> ', event.target.value);
  }

  const addRoute = (route: AppRoute) => (
    <Route key={route.key} path={route.path} component={route.component || PageDefault} exact />
  );

  return (
    <AppContext.Provider value={userMode}>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route key='login' path='/login' component={() => user?.email ? <Redirect to='/' /> : <Login />} exact />
              <Route key='register' path='/register' component={() => user?.email ? <Redirect to='/' /> : <Register />} exact />
              {
                user?.email ?
                <Layout handleSearch={Debounce(searchLocationWeather, 1000)}>
                  {routes.map((route: AppRoute) =>
                    route.subRoutes ? route.subRoutes.map((item: AppRoute) => addRoute(item)) : addRoute(route)
                  )}
                </Layout>
                : <Redirect to="/login" />
              }
            </Switch>
          </Router>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
