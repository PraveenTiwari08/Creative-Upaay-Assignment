import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
        toast.error("Email and Password are required!"); //  Show error if fields are empty
        return;
    }

    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            email: formData.email.trim(), //  Trim extra spaces
            password: formData.password,
        });

        dispatch(login(res.data));
        toast.success("Login Successful!");
        navigate("/");
    } catch (error) {
        toast.error(error.response?.data?.error || "Login Failed!"); //  Show backend error message
    }
};

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField 
            label="Email" 
            fullWidth 
            margin="normal" 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />
          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            margin="normal" 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
        <Typography mt={2} textAlign="center">
          Don't have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
