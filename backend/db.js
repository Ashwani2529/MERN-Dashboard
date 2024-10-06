const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoURI = "mongodb+srv://ashwanix2749:n6L6h8QB5xZJhNx9@cluster1.wsuyb84.mongodb.net/user";
const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => console.log("mongodb connected successfully"))
    .catch(err => console.error("Failed to connect to MongoDB", err));
};
module.exports = connectToMongo;