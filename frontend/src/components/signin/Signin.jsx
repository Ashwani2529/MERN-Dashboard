import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import img from "./img.jpg";
// Custom theme (optional)
const theme = createTheme();

const Signin = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const onValueChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  //calling signup api
  const login = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (!data || res.status !== 200 || res.success === false) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Login Successful");
      localStorage.setItem("logintoken", data.data);
      navigate("/profile");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* Background Image */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Sign-In Form */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {/* Email Field */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={userDetails.email}
                onChange={(e) => onValueChange(e)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {/* Password Field */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={userDetails.password}
                onChange={(e) => onValueChange(e)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* Remember Me Checkbox */}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {/* Sign In Button */}
              <Button
                fullWidth
                onClick={login}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signin;
