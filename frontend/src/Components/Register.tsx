import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import Layout from "./Layout";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const register = async () => {
    //console.log("user",user)
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(await response.json());
    if (response.ok) {
      //     console.log(await response.json())
      navigate("/login");

      // } else {
      //     alert("Email already again")
    }
  };
  return (
    <Layout>
      <p style={{ textAlign: "center" }}>Please register.</p>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          alignItems: "center",
          margin: "0 auto",
          mt: 6,
        }}
      >
        <TextField
          sx={{ minWidth: "200px" }}
          label="Name"
          variant="outlined"
          onChange={(event) => setUser({ ...user, name: event.target.value })}
        />

        <TextField
          label="Email"
          variant="outlined"
          sx={{ my: 2, minWidth: "200px" }}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />

        <TextField
          sx={{ minWidth: "200px" }}
          label="Password"
          type="password"
          variant="outlined"
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        />

        <Button variant="contained" sx={{ mt: 2 }} onClick={register}>
          Register
        </Button>
      </Box>
    </Layout>
  );
};
export default Register;
