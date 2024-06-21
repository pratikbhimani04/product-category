const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
          message: "Please provide name, email and password",
        });
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ name: name }, { email: email }],
    });
    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      ...req.body,
      email: email.toLowerCase(),
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  signup,
  login,
};
