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
import AddonCategories from './Components/AddonCategories';
import Logout from './Components/Logout';
import AppProvider from './contexxt/AppContext';

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
    element:<AddonCategories/>
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
root.render(<AppProvider>
  <RouterProvider router={router}/>
</AppProvider>)
//root.render(<App/>)
