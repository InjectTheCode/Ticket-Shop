const express = require("express");
const ticketController = require("../controllers/ticket/ticketController");
const { tokenAuthentication } = require("../middleware/auth");
const { checkAdmin } = require("../middleware/checkAdmin");

const router = express.Router();

// Get methods
router.get("/", ticketController.getAllTicket);
router.get("/:id", ticketController.getTicket);

// Post methods
router.post(
  "/",
  tokenAuthentication,
  checkAdmin,
  ticketController.addNewTicket
);

// Patch methods
router.patch(
  "/:id",
  tokenAuthentication,
  checkAdmin,
  ticketController.updateTicketById
);

// Delete methods
router.delete(
  "/:id",
  tokenAuthentication,
  checkAdmin,
  ticketController.deleteTicket
);
router.delete(
  "/",
  tokenAuthentication,
  checkAdmin,
  ticketController.deleteManyTickets
);

module.exports = router;
