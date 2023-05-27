import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const Register = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" })
    const register = async () => {
        //console.log("user",user)
        const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        });
        console.log(await response.json())
           
    }
    return (
        <Box sx={{display:"flex",flexDirection:"column",mt:5}}>
            <TextField 
            id="outlined-basic" 
            sx={{minWidth:"200px"}}
            label="Name" 
                variant="outlined"
                onChange={(event) => setUser({ ...user, name:event.target.value})}
            />
            
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
            
            <Button variant="contained" sx={{ mt: 2 }} onClick={register}>
                Register
            </Button>
        </Box>
    )
}
export default Register; 