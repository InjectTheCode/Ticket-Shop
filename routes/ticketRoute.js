const express = require("express");
const ticketController = require("../controllers/ticket/ticketController");

const router = express.Router();

router.get("/", ticketController.getAllTicket);
router.post("/", ticketController.addNewTicket);
router.patch("/:id", ticketController.updateTicketById);

module.exports = router;
