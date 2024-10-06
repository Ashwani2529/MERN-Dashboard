import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  MenuItem,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Custom theme (optional)
const theme = createTheme();

export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const onValueChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  //calling signup api
    const signup = async (e) => {
        e.preventDefault();
        const { firstName, lastName,gender,dob,phone,address,email,password } = userDetails;
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            gender,
            dob,
            phone,
            address,
            email,
            password,
            }),
        });
        const data = await res.json();
        if (!data || res.status !== 200 || data.success === false) {
          window.alert("Invalid Registration");
        } else {
          window.alert("Registration Successful");
          navigate("/signin");
        }
    };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Avatar and Lock Icon */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {/* Form */}
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  value={userDetails.firstName}
                  onChange={(e) => onValueChange(e)}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={userDetails.lastName}
                  onChange={(e) => onValueChange(e)}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="gender"
                  name="gender"
                  value={userDetails.gender}
                  onChange={(e) => onValueChange(e)}
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                 /> 
                
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={userDetails.dob}
                  onChange={(e) => onValueChange(e)}
                  id="dob"
                  type="date"
                  name="dob"
                  autoComplete="dob"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="phone"
                  name="phone"
                  required
                  fullWidth
                  value={userDetails.phone}
                  onChange={(e) => onValueChange(e)}
                  id="phone"
                  type="tel"
                  label="Phone"
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  value={userDetails.address}
                  onChange={(e) => onValueChange(e)}
                  label="Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userDetails.email}
                  onChange={(e) => onValueChange(e)}
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userDetails.password}
                  onChange={(e) => onValueChange(e)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            {/* Sign Up Button */}
            <Button
              onClick={signup}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            {/* Already have an account? */}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
