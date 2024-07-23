import {Router} from "express"
import Customer from "../controller/customer.controller.js"
import { verifyAccessToken } from "../utils/jwtHelper.js"

const customerRoute = Router()

customerRoute.get("/get-customers", Customer.getCustomer)
customerRoute.get("/overview/:id", Customer.getCustomerById)
customerRoute.post("/create-customer", verifyAccessToken, Customer.createCustomer)
customerRoute.put("/overview/update/status", Customer.updateCustomerStatus)
customerRoute.put("/overview/update/assign", Customer.updateCustomerAssign)
customerRoute.put("/overview/update/:id", Customer.updateCustomerById)
customerRoute.delete("/overview/delete/:id", Customer.deleteCustomer)


export default customerRoute