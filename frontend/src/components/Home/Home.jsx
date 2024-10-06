import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export default function Home() {
  //fetch posts from API
  const [posts, setPosts] = React.useState([]);
  const fetchPosts = async () => {  
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/allPosts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!data || res.status !== 200 || data.success === false) {
      window.alert("No posts found");
    } else {
      setPosts(data.data);
    }
  };
  React.useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Grid container sx={{backgroundColor:"black",height:'max-content',padding:"2%"}}>
      <Grid item xs={12}>
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {posts.map((value) => (
            <Grid key={value} item>
              <Paper
                sx={(theme) => ({
                  height: 300,
                  width: 300,
                  backgroundImage:'url(' + value.public_url + ')',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  ...theme.applyStyles('dark', {
                    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
                  }),
                })}
              />
              <Typography variant="h6" sx={{color:"white",textAlign:"center"}}>{value.caption}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}