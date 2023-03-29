const express = require("express");
const ticketController = require("../controllers/ticket/ticketController");

const router = express.Router();

router.get("/", ticketController.getAllTicket);
router.post("/", ticketController.addNewTicket);
router.patch("/:id", ticketController.updateTicketById);
router.delete("/:id", ticketController.deleteTicket);
router.delete("/", ticketController.deleteManyTickets);

module.exports = router;
