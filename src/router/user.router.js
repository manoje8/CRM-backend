import { Router } from "express";
import User from "../controller/user.controller.js";
import { verifyAccessToken } from "../utils/jwtHelper.js";

const userRoute = Router();

userRoute.post("/register", User.register);
userRoute.post("/login", User.login);
userRoute.get("/activate-account/:token", User.activation);
userRoute.post("/forgot-password", User.forgotPassword);
userRoute.post("/reset-password", User.resetPassword);
userRoute.get("/get-user", verifyAccessToken, User.getUser)

export default userRoute