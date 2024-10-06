import React, { useEffect, useState } from "react";
import { Grid} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "./ProfileComponents/ProfileCard";
import SettingsCard from "./ProfileComponents/SettingCard";

// STYLE & THEME
const theme = createTheme();

// APP
export default function App() {
  const [mainUser, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    dob: "",
    pass: "",
    address: "",
    posts:0
  });
  const fetchProfile = async () => {
    const res = await fetch("http://localhost:5000/api/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("logintoken"),
      },
    });
    const data = await res.json();
    if (!data || res.status !== 200 || data.success === false) {
      window.alert("Invalid Registration");
    } else {
      setUser({...data.data});
      fullName = `${data.data.firstName} ${data.data.lastName}`;  
    }
  };
  useEffect(() => {
    //call api and update SetUser
    fetchProfile();
  });

  let fullName = `${mainUser.firstName} ${mainUser.lastName}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* BACKGROUND */}
      <Grid container direction="column" sx={{ overflowX: "hidden" }}>
        <Grid item xs={12} md={6}>
          <img
            alt="avatar"
            style={{
              width: "100vw",
              height: "35vh",
              objectFit: "cover",
              objectPosition: "50% 50%",
              position: "relative",
            }}
            src="https://iris2.gettimely.com/images/default-cover-image.jpg"
          />
        </Grid>

        {/* COMPONENTS */}
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{
            position: "absolute",
            top: "20vh",
            px: { xs: 0, md: 7 },
          }}
        >
          {/* PROFILE CARD */}
          <Grid item md={3}>
            <ProfileCard
              name={fullName}
              sub={"Name"}
              dt1={mainUser.posts}
            />
          </Grid>

          {/* SETTINGS CARD */}
          <Grid item md={9}>
            <SettingsCard
              firstName={mainUser.firstName}
              lastName={mainUser.lastName}
              dob={mainUser.dob}
              phone={mainUser.phone}
              email={mainUser.email}
              pass={mainUser.pass}
              address={mainUser.address}
              gender={mainUser.gender}
              fetchProfile={fetchProfile}
            />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
