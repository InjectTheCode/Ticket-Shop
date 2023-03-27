const express = require("express");
const userController = require("../controllers/user/userController");

const router = express.Router();

router.get("/api/v1/user", userController.getAllUsers);
router.get("/api/v1/user/:id", userController.getUserById);
router.post("/api/v1/user", userController.registerUser);
router.delete("/api/v1/user/:id");
router.patch("/api/v1/user/:id", userController.updateUserById);
router.head("/api/v1/user/phone/:phone");

module.exports = router;
