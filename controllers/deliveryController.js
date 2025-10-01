import { calculateMinCost } from "../services/deliveryService.js";

export function calculateDeliveryCost(req, res) {
  try {
    const order = req.body;

    if (!order || Object.keys(order).length === 0) {
      return res.status(400).json({ error: "Order cannot be empty" });
    }

    const cost = calculateMinCost(order);
    res.json({ minimumCost: cost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
