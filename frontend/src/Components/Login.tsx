import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const login = async () => {
        //console.log("user",user)
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        });
        //console.log(await response.json())
        // console.log(response)
        if (response.ok) {
            const responseData = await response.json()
            //console.log("accessToken",responseData)

            const accessToken = responseData.accessToken;
            localStorage.setItem("accessToken",accessToken)

            navigate("/")
        }
           
    }
    return (
        <Layout>
            <Box sx={{display:"flex",flexDirection:"column",margin:"0 auto",maxWidth:"400px",alignItems:"center",mt:6}}>
            
            <TextField 
            
            label="Email" 
                variant="outlined"
                sx={{ my: 2, minWidth: "200px" }}
                onChange={(event) => setUser({ ...user, email:event.target.value})}
            />
            
            <TextField 
            
            sx={{minWidth:"200px"}}
                label="Password" 
                type="password"
                variant="outlined"
                onChange={(event) => setUser({ ...user, password:event.target.value})}
            />
            
            <Button variant="contained" sx={{ mt: 2 }} onClick={login}>
                Log in
                </Button>
                {/* <Box sx={{mt:4}}>
                    <p style={{textDecoration:"none",marginRight:"5px",display:"inline"}}>Don't have an account?</p>
                    <a href="/register" style={{textDecoration:"none",color:"blue"}}>Register here</a>
                </Box> */}
                <Typography variant="body1" sx={{mt:3}}>
                    Don't have an account?
                    <a style={{ textDecoration: "none", color: "blue" }} href="/register">Register here.</a>
                </Typography>
        </Box>
        </Layout>
    )
}
export default Login; 