import * as React from 'react';
import { Box } from '@mui/material';
import { Link,useNavigate} from 'react-router-dom';
export default function Navbar() {
    const login = localStorage.getItem("logintoken");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("logintoken");
        navigate("/signin");
    };
    return (
        <Box
        sx={{
          my:4,
          mx: 4,
          display: "flex",
          justifyContent: "space-between",
          underline: "none",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Link to="/signin" style={{textDecoration:"none"}}>Sign In</Link>
        <Link to="/" style={{textDecoration:"none"}}>Home</Link>
        {login ? <Link to="/profile" style={{textDecoration:"none"}}>Profile</Link> : null}
        {login ? (
                <button onClick={handleLogout} style={{fontSize:"medium" ,textDecoration: "none", background: "none", border: "none", cursor: "pointer" }}>
                    Logout
                </button>
            ) : null}
        <Link to="/signup" style={{textDecoration:"none"}}>Sign Up</Link>
      </Box>
    );
}