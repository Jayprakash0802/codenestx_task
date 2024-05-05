import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/home';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import App from './App';
import { Outlet,RouterProvider,createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import UserProvider from './components/context';

const router = createBrowserRouter([
  {
    path:'/',
    element:<UserProvider><Outlet/></UserProvider>,
    children:[
      {index:true,element:<App/>},
      {path:'/product',element:<Home/>},
      {path:'/login',element:<Login/>},
      {path:'/produdct/:id/edit',element:<EditProduct/>},
      {path:'/product/create',element:<CreateProduct/>},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
