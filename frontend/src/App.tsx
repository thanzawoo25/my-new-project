import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Register from './Components/Register';
import { Box, Typography } from '@mui/material';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <NavBar />
      
      <Box sx={{ mt: 5 }}>
        {/* <Register/> */}
        <Typography variant='h3'>
          Welcom To FOODIE POS
        </Typography>
      </Box>
      
    </div>
  );
}

export default App;
