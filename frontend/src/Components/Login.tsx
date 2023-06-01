import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            navigate("/")
        }
           
    }
    return (
        <Box sx={{display:"flex",flexDirection:"column",margin:"0 auto",maxWidth:"300px",alignItems:"center"}}>
            
            <TextField 
            id="outlined-basic" 
            label="Email" 
                variant="outlined"
                sx={{ my: 2, minWidth: "200px" }}
                onChange={(event) => setUser({ ...user, email:event.target.value})}
            />
            
            <TextField 
            id="outlined-basic" 
            sx={{minWidth:"200px"}}
                label="Password" 
                type="password"
                variant="outlined"
                onChange={(event) => setUser({ ...user, password:event.target.value})}
            />
            
            <Button variant="contained" sx={{ mt: 2 }} onClick={login}>
                Login
            </Button>
        </Box>
    )
}
export default Login; 