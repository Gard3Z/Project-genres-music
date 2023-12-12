import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu from './pages/Menu/Menu';
import InfoStyle from './pages/InfoStyle';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: "/",
    element: <Menu />
  },
  {
    path: "/infos/:style",
    element: <InfoStyle />
  },
  {
    path: "/contact",
    element: <Menu />
  },
  {
    path:"*",
    element:<Navigate to="/" replace />
  }
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


