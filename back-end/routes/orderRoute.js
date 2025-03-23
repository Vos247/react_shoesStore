import express from "express";
import {
  placeOderStripe,
  placeOders,
  placeOdersRazorpay,
  allOrders,
  updateStatus,
  userOrders,
  getTotalRevenue,
} from "../controllers/oderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";


const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.get("/total", adminAuth, getTotalRevenue);

orderRouter.post("/place", authUser, placeOders);


orderRouter.post("/userorder", authUser, userOrders);
export default orderRouter
