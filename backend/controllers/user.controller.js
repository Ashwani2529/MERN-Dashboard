const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      dob,
      phone,
      address,
      email,
      password,
      avatar,
    } = req.body;
    const isUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (isUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      gender,
      dob,
      phone,
      address,
      email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();

    return res.status(200).json({
      data: newUser,
      success: true,
      message: "Successfully created a user",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a user",
      err: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, isUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: isUser._id }, process.env.SECRETKEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      data: token,
      success: true,
      message: "Successfully logged in",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to login",
      err: error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    let user = req?.user;
    const noOfPosts=user.posts.length;
    let { posts, ...rest } = user._doc;
    user=rest;
    user.posts=noOfPosts;
    return res.status(200).json({
      data: user,
      success: true,
      message: "Successfully fetched user",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to find user",
      err: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req?.user;
    const {
      firstName,
      lastName,
      gender,
      dob,
      phone,
      address,
      email,
      password,
      avatar,
    } = req.body;
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        firstName,
        lastName,
        gender,
        dob,
        phone,
        address,
        email,
        password: hashedPassword,
        avatar,
      },
      { new: true }
    );
    return res.status(200).json({
      data: updatedUser,
      success: true,
      message: "Successfully updated user",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update the user",
      err: error,
    });
  }
};

const uploadFile = async (req, res) => {
  try {
    const user = req?.user;
    const { imageUrl, caption } = req.body;
    if (!imageUrl || !caption) {
      return res.status(400).json({
        data: {},
        success: false,
        message: "Please provide imageUrl and caption",
      });
    }

    const postAdded = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          posts: {
            public_url: imageUrl,
            caption: caption,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      data: postAdded,
      success: true,
      message: "Successfully uploaded file",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to upload file",
      err: error,
    });
  }
};
const getAllPosts = async (req, res) => {
  try {
    let posts = await User.find({}).select("posts");
    posts = posts.reduce((acc, user) => {
      return acc.concat(user.posts);
    }, []);
    return res.status(200).json({
      data: posts,
      success: true,
      message: "Successfully fetched posts",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch posts",
      err: error,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const user = req?.user;
    const posts = await User.findOne({ _id: user._id }).select("posts");
    return res.status(200).json({
      data: posts,
      success: true,
      message: "Successfully fetched posts",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch posts",
      err: error,
    });
  }
};

module.exports = {
  signUp,
  login,
  getUser,
  updateUser,
  uploadFile,
  getPosts,
  getAllPosts,
};
