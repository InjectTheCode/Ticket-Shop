const db = require("../../prisma/db");
const { exclude } = require("../../utils/exclude");

const orderService = {
  addNewOrderForUserServ: async (orderData) => {
    const { userId, ticketId, totalPrice, newStock, ticket_count } = orderData;

    try {
      const [order, _] = await db.$transaction([
        db.order.create({
          data: {
            userId,
            ticketId,
            totalPrice,
            ticket_count,
          },
        }),
        db.ticket.update({
          where: {
            id: ticketId,
          },
          data: {
            stock: newStock,
          },
        }),
      ]);

      return exclude(order, ["userId", "ticketId`"]);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  seeAllOrdersServ: async () => {
    return await db.order.findMany();
  },

  getOrderInfoServ: async (id) => {
    return await db.order.findUnique({
      where: { id },
    });
  },

  deleteOrderServ: async (id, ticketId, data) => {
    try {
      const [order, _] = await db.$transaction([
        db.order.delete({
          where: { id },
        }),
        db.ticket.update({
          where: { id: ticketId },
          data,
        }),
      ]);
      return order;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },

  updateOrderServ: async (id, tempData) => {
    return await db.order.update({
      where: { id },
      data: {
        ticket_count: tempData.ticket_count,
        totalPrice: tempData.ticket_count * tempData.unitPrice,
      },
    });
  },
};

module.exports = orderService;
