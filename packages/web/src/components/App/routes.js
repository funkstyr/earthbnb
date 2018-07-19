import React from 'react';
import Loadable from 'react-loadable';

const loading = () => <div>Loading...</div>;
const Landing = Loadable({
  loader: () => import('../Landing/Landing'),
  loading
});

export default [
  {
    title: 'Landing',
    path: '/',
    component: Landing,
    exact: true
  }
];
