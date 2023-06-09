const express = require("express");
const orderController = require("../controllers/order/orderController");
const { tokenAuthentication } = require("../middleware/auth");
const { checkAdmin } = require("../middleware/checkAdmin");
const { addOrderToUser } = require("../utils/validator");

const router = express.Router();

// Get methods
router.get("/", tokenAuthentication, checkAdmin, orderController.seeAllOrders);
router.get(
  "/:id",
  tokenAuthentication,
  checkAdmin,
  orderController.getOrderInfo
);

// Patch methods
router.patch("/:id", orderController.updateOrder);

// Post methods
router.post(
  "/",
  tokenAuthentication,
  addOrderToUser,
  orderController.createOrder
);

// Delete methods
router.delete(
  "/:id",
  tokenAuthentication,
  checkAdmin,
  orderController.deleteOrder
);

module.exports = router;
