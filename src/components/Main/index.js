import { lazy } from 'react';
// import "./style.scss";


const MainPage = {
  path: '/',
  exact: true,
  component: lazy(() => import('./Main'))
}

export default MainPage;