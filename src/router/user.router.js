import { Router } from "express";
import User from "../controller/user.controller.js";

const userRoute = Router();

userRoute.post("/register", User.register);
userRoute.post("/login", User.login);
userRoute.get("/activate-account/:token", User.activation);
userRoute.post("/forgot-password", User.forgotPassword);
userRoute.post("/reset-password", User.resetPassword);
userRoute.get("/all-users", User.getAllUsers)
userRoute.put("/update-role", User.updateUserRole)
userRoute.delete("/:email", User.deleteUser)

export default userRoute