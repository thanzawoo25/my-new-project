import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Register from './Components/Register';
import { Box, Typography, useStepContext } from '@mui/material';
import Login from './Components/Login';
import Layout from './Components/Layout';
import { AppContext } from './contexxt/AppContext';

function App() {

  const contextData = useContext(AppContext)
  const accessToken = localStorage.getItem("accessToken");
  //console.log("App Page:",accessToken)

    useEffect(() => {
      fetchData()
  //console.log(contextData)

    }, []);
  
    const fetchData =async() => {
      const response = await fetch("http://localhost:5000/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(await response.json())
    }
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



 
