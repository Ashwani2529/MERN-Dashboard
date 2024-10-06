import {
  Avatar,
  Badge,
  Button,
  Grid,
  Card,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
};

export default function ProfileCard({ name, sub, dt1 }) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [caption, setCaption] = React.useState("");
  let image = null;
  const handleFileChange = (event) => {
    image = event.target.files[0];
    setFile(image);
  };
  const uploadimg = () => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "chikan");
      data.append("cloud_name", "diex70uhw");
  
      fetch(`https://api.cloudinary.com/v1_1/diex70uhw/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "allow-origin": "*",
              token: localStorage.getItem("logintoken"),
            },
            body: JSON.stringify({ imageUrl: data.url, caption }),
          };
  
          fetch("http://localhost:5000/api/user/upload", options).then((res) => {
          });
  
          setFile(null);
          setCaption("");
          setOpen(false);
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("NO image");
    }
  };
  return (
    <>
      {/* Modal using MUI material */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={styles.modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Create New Post
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            label="Caption"
            variant="outlined"
          />
          {file !== null ? <Typography mt={2}>{file.name}</Typography> : null}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => handleFileChange(event)}
              />
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => uploadimg()}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Card variant="outlined">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {/* CARD HEADER START */}
          <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
            {/* PROFILE PHOTO */}
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
             
            >
              <Avatar
                sx={{ width: 100, height: 100, mb: 1.5 }}
                src="https://www.flaticon.com/free-icon/user_1077012?term=user&page=1&position=14&origin=tag&related_id=1077012"
              />
            </Badge>

            {/* DESCRIPTION */}
            <Typography variant="h6">{name}</Typography>
            <Typography color="text.secondary">{sub}</Typography>
          </Grid>
          {/* CARD HEADER END */}

          {/* DETAILS */}
          <Grid container>
            <Grid item xs={6}>
              <Typography style={styles.details}>Posts</Typography>
            </Grid>
            {/* VALUES */}
            <Grid item xs={6} sx={{ textAlign: "end" }}>
              <Typography style={styles.value}>{dt1}</Typography>
            </Grid>
          </Grid>

          {/* BUTTON */}
          <Grid item style={styles.details} sx={{ width: "100%" }}>
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              sx={{ width: "99%", p: 1, my: 2 }}
            >
              + Post
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
