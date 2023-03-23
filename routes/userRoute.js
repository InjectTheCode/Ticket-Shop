const express = require("express");
const router = express.Router();

router.get("/");
router.get("/:id");
router.delete("/:id");
router.patch("/:id");
router.head("/phone/:phone");

module.exports = router;
