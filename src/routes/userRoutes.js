const express = require("express");
const { signup, login } = require("../controllers/userControllers");
const validateSchema = require("../middleware/schemaValidate");
const { SignupReqSchema, LoginReqSchema } = require("../validators/userSchema");
const userRoutes = express.Router();

userRoutes.post("/signup", validateSchema(SignupReqSchema), signup);
userRoutes.post("/login", validateSchema(LoginReqSchema), login);

module.exports = userRoutes;
