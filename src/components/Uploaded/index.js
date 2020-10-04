import { lazy } from 'react';

const UploadedImages = {
  path: '/uploaded',
  exact: true,
  component: lazy(() => import('./Uploaded'))
}

export default UploadedImages;