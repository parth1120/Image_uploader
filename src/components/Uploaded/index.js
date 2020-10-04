import { lazy } from 'react';
// import "./style.scss";


const UploadedImages = {
  path: '/uploaded',
  exact: true,
  component: lazy(() => import('./Uploaded'))
}

export default UploadedImages;