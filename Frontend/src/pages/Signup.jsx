import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:5000/api/auth/signup", formData);
      await axios.post("https://creative-upaay-assignment.onrender.com/api/auth/signup", formData);
      toast.success("Signup Successful! Please Login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed!");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">Sign Up</Typography>
        <form onSubmit={handleSignup}>
          <TextField 
            label="Name" 
            fullWidth 
            margin="normal" 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        </form>
        <Typography mt={2} textAlign="center">
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Signup;
