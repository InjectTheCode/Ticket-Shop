const ticketService = require("./ticketService");

const ticketController = {
  getAllTicket: async (req, res, next) => {
    try {
      const allTickets = await ticketService.getAllTicketServ();
      if (allTickets.length < 1) {
        return res.status(404).send("No tickets found in the list of tickets");
      } else {
        return res.status(200).json(allTickets);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getTicket: async (req, res, next) => {
    try {
      const { id } = req.params;
      const getTicket = await ticketService.getTicketServ(id);
      return res.status(200).json(getTicket);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  addNewTicket: async (req, res, next) => {
    // data from req.body expects a JSON object.

    try {
      const data = req.body;
      const newTicket = await ticketService.addNewTicketServ({
        ...req.body,
        arrivalDate: new Date(data.arrivalDate),
        departureDate: new Date(data.departureDate),
      });
      const result = {
        message: "new ticket added",
        data: newTicket,
      };
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateTicketById: async (req, res, next) => {
    // I will send the ID of the ticket with param.
    // and send a json request to update any thing as I want.

    try {
      const { id } = req.params;
      const data = req.body;
      if (!id) {
        res.status(404).json({
          message: "Invalid ticket id or does not exist!",
        });
      } else {
        const updatedTicket = await ticketService.updateTicketServ(id, data);
        return res.status(200).json({
          message: `ticket ${updatedTicket.fromLocation} to ${updatedTicket.toLocation} updated successfully`,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteTicket: async (req, res, next) => {
    // I will send the ticket's ID with req.param.

    try {
      const { id } = req.params;
      await ticketService.deleteTicketServ(id);
      res.status(200).json({
        message: `one ticket was deleted successfully`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteManyTickets: async (req, res, next) => {
    // in this method you should send an object with one property "ids", which should be an array!
    try {
      const { ids } = req.body; // this is array of ticket's ids
      for (const id of ids) {
        await ticketService.deleteTicketServ(id);
      }
      res.status(200).json({
        message: "Your tickets were deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = ticketController;
