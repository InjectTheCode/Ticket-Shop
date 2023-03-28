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

  addNewTicket: async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      const newTicket = await ticketService.addNewTicketServ({
        ...req.body,
        arrivalDate: new Date(data.arrivalDate),
        departureDate: new Date(data.departureDate),
      });
      const result = {
        message: "new ticket added",
        data: newTicket,
      };
      return res.status(204).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateTicketById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = req.body;
      if (!id) {
        res.status(404).json({
          message: "Invalid ticket id or does not exist!",
        });
      } else {
        const updatedTicket = await ticketService.updateTicketServ(id, data);
        res.status(204).json(updatedTicket);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = ticketController;
