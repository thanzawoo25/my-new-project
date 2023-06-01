import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';

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
  }
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router}/>)
//root.render(<App/>)
