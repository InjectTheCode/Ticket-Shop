const db = require("../../prisma/db");
const { exclude } = require("../../utils/exclude");

const orderService = {
  addNewOrderForUserServ: async (orderData) => {
    const { userId, ticketId, totalPrice, newStock } = orderData;

    try {
      const [order, _] = await db.$transaction([
        db.order.create({
          data: {
            userId,
            ticketId,
            totalPrice,
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

  deleteOrderServ: async (id) => {
    return await db.order.delete({
      where: { id },
    });
  },
};

module.exports = orderService;
