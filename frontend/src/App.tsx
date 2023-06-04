import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Register from './Components/Register';
import { Box, Typography } from '@mui/material';
import Login from './Components/Login';
import Layout from './Components/Layout';

function App() {
  const accessToken = localStorage.getItem("accessToken:");
  console.log("App Page:",accessToken)

  // useEffect(() => {
  //   fetchData()
  // }, []);
  // const fetchData =async() => {
  //   const response = await fetch("http://localhost:5000/menus");
  //   console.log(await response.json())
  // }
  return (
    <Layout>
       <div className="App">
      {/* <NavBar /> */}
      
      <Box sx={{ mt: 5 }}>
        {/* <Register/> */}
        <Typography variant='h3'>
          Welcom To FOODIE POS
        </Typography>
      </Box>
    </div>
   </Layout>
  );
}

export default App;

