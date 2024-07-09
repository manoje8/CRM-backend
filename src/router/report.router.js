import { Router } from "express";
import Reports from "../controller/report.controller.js";

const reportRoute = Router();

reportRoute.get("/sales-by-month",Reports.salesByMonth)
reportRoute.get("/conversion",Reports.conversion)
export default reportRoute