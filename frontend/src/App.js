import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signin/Signin';
import SignUp from './components/signup/Signup';
import './App.css';
import Profile from './components/profile/Profile';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  let login = localStorage.getItem("logintoken");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={login ? <Profile /> : <SignIn />}
        />
      </Routes>
    </Router>
  );
}
export default App;