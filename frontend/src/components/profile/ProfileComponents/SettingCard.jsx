// IMPORTS
import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Card,
  CardContent,
  FormControl,
  Tabs,
  Tab,
  InputAdornment,
  Box,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomInput from "./CustomInputs";
import Posts from "../../MyPosts/Posts";

//APP
export default function SettingsCard(props) {
  //TAB STATES
  const [val, setValue] = useState("one");
  const [selectedTab, setSelectedTab] = useState("profile");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // GENDER SELECT STATES
  const genderSelect = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  // FORM STATES
  const [user, setUser] = useState({
    // DEFAULT VALUES
    firstName: props.firstName,
    lastName: props.lastName,
    dob: props.dob,
    gender: props.gender,
    phone: props.phone,
    email: props.email,
    pass: props.pass,
    address: props.address,
    showPassword: false,
  });
  useEffect(() => {
    setUser({
      firstName: props.firstName,
      lastName: props.lastName,
      dob: props.dob,
      gender: props.gender,
      phone: props.phone,
      email: props.email,
      pass: props.pass,
      address: props.address,
      showPassword: false,
    });
  }, [props]);

  const changeField = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  //BUTTON STATES
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  // EDIT -> UPDATE
  const changeButton = () => {
    user.showPassword = false;
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
  };

  // UPDATE USER DATA
  const updateUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("logintoken"),
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (!data || res.status !== 200 || data.success === false) {
      window.alert("Invalid Registration");
    } else {
      window.alert("User Updated");
      props.fetchProfile();
    }
    changeButton();
  }

  // TOGGLE PASSWORD VISIBILITY
  const handlePassword = () => {
    user.showPassword = !user.showPassword;
    setUser({ ...user });
  };
  const switchTab = (tab) => {
    setSelectedTab(tab);
  };
  //RETURN
  return (
    <Card
      variant="outlined"
      sx={{ height: "auto", minHeight: "70vh", width: "100%" }}
    >
      {/* TABS */}
      <br />
      <Tabs
        value={val}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="one" label="Account" onClick={() => switchTab("profile")} />
        <Tab
          value="myposts"
          label="My Posts"
          onClick={() => switchTab("myposts")}
        />
      </Tabs>
      <Divider />

      {/* MAIN CONTENT CONTAINER */}
      {selectedTab === "profile" ? (
        <form>
          <CardContent
            sx={{
              p: 3,
              maxHeight: { md: "50vh" },
              textAlign: { xs: "center", md: "start" },
            }}
          >
            {/* FIELDS */}
            <FormControl fullWidth>
              <Grid
                container
                direction={{ xs: "column", md: "row" }}
                columnSpacing={5}
                rowSpacing={3}
              >
                {/* ROW 1: FIRST NAME */}
                <Grid item xs={6}>
                  <CustomInput
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={changeField}
                    title="First Name"
                    dis={edit.disabled}
                    req={edit.required}
                  />
                </Grid>

                {/* ROW 1: LAST NAME */}
                <Grid item xs={6}>
                  <CustomInput
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={changeField}
                    title="Last Name"
                    dis={edit.disabled}
                    req={edit.required}
                  />
                </Grid>

                {/* ROW 2: dob */}
                <Grid item xs={6}>
                  <CustomInput
                    id="dob"
                    name="dob"
                    value={user.dob}
                    onChange={changeField}
                    dis={edit.disabled}
                    req={edit.required}
                    type="date"
                  />
                </Grid>

                {/* ROW 2: GENDER */}
                <Grid item xs={6}>
                  <CustomInput
                    select
                    id="gender"
                    name="gender"
                    value={user.gender.toLowerCase()}
                    onChange={changeField}
                    title="Gender"
                    dis={edit.disabled}
                    req={edit.required}
                    //MAP THRU OPTIONS
                    content={genderSelect.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  />
                </Grid>

                {/* ROW 3: PHONE */}
                <Grid item xs={6}>
                  <CustomInput
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={changeField}
                    title="Phone Number"
                    dis={edit.disabled}
                    req={edit.required}
                  />
                </Grid>

                {/* ROW 3: EMAIL */}
                <Grid item xs={6}>
                  <CustomInput
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={changeField}
                    title="Email Address"
                    dis={edit.disabled}
                    req={edit.required}
                  />
                </Grid>

                {/* ROW 4: PASSWORD */}
                <Grid item xs={6}>
                  <CustomInput
                    id="pass"
                    name="pass"
                    value={user.pass}
                    onChange={changeField}
                    title="Password"
                    dis={edit.disabled}
                    req={edit.required}
                    type={user.showPassword ? "text" : "password"}
                    // PASSWORD ICON
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handlePassword}
                            edge="end"
                            disabled={edit.disabled}
                          >
                            {user.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* ROW 4: ADDRESS */}
                <Grid item xs={6}>
                  <CustomInput
                    id="address"
                    name="address"
                    value={user.address}
                    onChange={changeField}
                    title="Address"
                    dis={edit.disabled}
                    req={edit.required}
                  />
                </Grid>

                {/* BUTTON */}
                <Grid
                  container
                  fullWidth
                  justifyContent={{ xs: "center" }}
                  item
                
                >
                  {edit.isEdit === false ? (
                    <div style={{display:'flex',gap:'30px',justifyContent:'center'}}>
                      <Button
                        sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                        component="button"
                        size="large"
                        variant="contained"
                        color="secondary"
                        onClick={(e) => updateUser(e)}
                      >
                        UPDATE
                      </Button>
                      <Button
                        sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                        component="button"
                        size="large"
                        variant="contained"
                        color="secondary"
                        onClick={(e) => changeButton(e)}
                      >
                        CANCEL
                      </Button>
                    </div>
                  ) : (
                    <Button
                      sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                      component="button"
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={(e) => changeButton(e)}
                    >
                      EDIT
                    </Button>
                  )}
                </Grid>
              </Grid>
            </FormControl>
          </CardContent>
        </form>
      ) : (
        <CardContent>
          <Box>
            <Posts />
          </Box>
        </CardContent>
      )}
    </Card>
  );
}
