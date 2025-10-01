import express from "express";
import { calculateDeliveryCost } from "../controllers/deliveryController.js";

const router = express.Router();

router.post("/", calculateDeliveryCost);

export default router;
