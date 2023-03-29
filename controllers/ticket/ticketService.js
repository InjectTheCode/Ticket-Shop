const db = require("../../prisma/db");

const ticketService = {
  getAllTicketServ: async () => {
    const alltickets = await db.ticket.findMany();
    return alltickets;
  },

  addNewTicketServ: async (data) => {
    const newTicket = await db.ticket.create({
      data,
    });
    return newTicket;
  },

  updateTicketServ: async (id, data) => {
    const updatedTicket = await db.ticket.update({
      where: { id },
      data,
    });
    return updatedTicket;
  },

  deleteTicketServ: async (id) => {
    const deletedTicket = await db.ticket.delete({
      where: { id },
    });
    return deletedTicket;
  },
};

module.exports = ticketService;
