const express = require("express");
const userController = require("../controllers/user/userController");
const { tokenAuthentication } = require("../middleware/auth");
const { checkAdmin } = require("../middleware/checkAdmin");

const router = express.Router();

// Get methods
router.get("/", tokenAuthentication, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/phone/:phone", userController.getUserByPhone);

// Delete methods
router.delete("/:id", userController.deleteUserById);

// Patch methods
router.patch("/:id", userController.updateUserById);

// Post methods
router.post("/", userController.registerUser);
router.post("/wallet", userController.increaseWallet);
router.post("/login", userController.login);

// router.head("/phone/:phone"); // I thing this shouldn't be necessary, although I have GET by /phone/:phone

module.exports = router;
