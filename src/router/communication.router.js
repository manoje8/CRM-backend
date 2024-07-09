import { Router } from "express";
import Communication from "../controller/communication.controller.js";

const communicationRoute = Router()

communicationRoute.post("/send-email", Communication.sendEmail)
communicationRoute.get("/:userId/communications", Communication.userCommunicationDetails)

export default communicationRoute