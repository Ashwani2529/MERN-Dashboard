const jwt = require('jsonwebtoken')
const {User} = require("../models/User");
require('dotenv').config();
const JWT_SECRET = process.env.SECRETKEY

// verify user by middleware function
const verifyUser = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).send({ status: false, error: 'unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded?.id });
        req.user = user;
        next();
    } catch(error) {
        console.log(error);
        return res.status(401).send({ status: false, message: "Invalid JWT Token", error: 'forbidden access' });
    }
}

module.exports = { verifyUser }
