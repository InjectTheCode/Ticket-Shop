const express = require("express");
const userController = require("../controllers/user/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/phone/:phone", userController.getUserByPhone);
router.post("/", userController.registerUser);
router.delete("/:id", userController.deleteUserById);
router.patch("/:id", userController.updateUserById);
router.post("/wallet", userController.increaseWallet);
// router.head("/phone/:phone"); // I thing this shouldn't be necessary, although I have GET by /phone/:phone

module.exports = router;
