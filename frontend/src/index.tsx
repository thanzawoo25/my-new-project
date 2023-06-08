import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Orders from './Components/Orders';
import Menus from './Components/Menus';
import MenuCategories from './Components/MenuCategories';
import Settings from './Components/Settings';
import Locations from './Components/Locations';
import Addons from './Components/Addons';
import AddonsCategories from './Components/AddonsCategories';
import Logout from './Components/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>
  },
   {
    path: "/register",
    element:<Register/>
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/logout",
    element:<Logout/>
  },
  {
    path: "/orders",
    element:<Orders/>
  },
  {
    path: "/menus",
    element:<Menus/>
  },
  {
    path: "/menu-categories",
    element:<MenuCategories/>
  },
  {
    path: "/addons",
    element:<Addons/>
  },
  {
    path: "/addon-categories",
    element:<AddonsCategories/>
  },
  {
    path: "/locations",
    element:<Locations/>
  },
  {
    path: "/settings",
    element:<Settings/>
  },
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router}/>)
//root.render(<App/>)
