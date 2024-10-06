const connectToMongo = require("./db.js");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors(
  {
    origin: "https://mern-dashboard-mu.vercel.app",
    credentials: true
  }
));
app.use(express.json());
connectToMongo();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/routes"));

app.get("/", (req, res) => {
  res.send("HAHAHA");
});

app.listen(port, () => {
  console.log(`${port}`);
});