import express from "express"
import { listOrders, orderStatus, placeOrder, userOrders, verifyOrder } from "../controller/orderController.js";
import verifyToken from "../auth/verifyToken.js";


const orderRoute=express.Router();

orderRoute.post("/create",verifyToken,placeOrder)
orderRoute.post("/verify",verifyOrder)
orderRoute.post("/myorder",verifyToken,userOrders)
orderRoute.get("/list",listOrders)
orderRoute.post("/status",orderStatus)

export default orderRoute;