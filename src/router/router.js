import { Router } from "express";
import userRoute from "./user.router.js";
import customerRoute from "./customer.router.js";
import queryRoute from "./query.router.js";
import communicationRoute from "./communication.router.js";
import reportRoute from "./report.router.js";

const route = Router();

route.use("/user",userRoute)
route.use("/customer", customerRoute)
route.use("/service", queryRoute)
route.use("/communication", communicationRoute)
route.use("/reports", reportRoute)

export default route