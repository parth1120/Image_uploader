import { lazy } from 'react';

const MainPage = {
  path: '/',
  exact: true,
  component: lazy(() => import('./Main'))
}

export default MainPage;