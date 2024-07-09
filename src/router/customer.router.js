import {Router} from "express"
import Customer from "../controller/customer.controller.js"
import { verifyAccessToken } from "../utils/jwtHelper.js"
import Purchase from "../controller/purchase.controller.js"

const customerRoute = Router()

customerRoute.get("/get-customers", Customer.getCustomer)
customerRoute.get("/overview/token/:token", verifyAccessToken, Customer.getCustomerByToken)
customerRoute.get("/overview/:id", Customer.getCustomerById)
customerRoute.post("/create-customer", verifyAccessToken, Customer.createCustomer)
customerRoute.put("/overview/update/status", Customer.updateCustomerStatus)
customerRoute.put("/overview/update/:id", Customer.updateCustomerById)
customerRoute.delete("/overview/delete/:id", Customer.deleteCustomer)

//Purchase

customerRoute.post("/purchase", verifyAccessToken,Purchase.addPurchase)
customerRoute.get("/getPurchases/:id", Purchase.getPurchases)

export default customerRoute