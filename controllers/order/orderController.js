const ticketController = require("../ticket/ticketController");
const ticketService = require("../ticket/ticketService");
const orderService = require("./orderService");

const orderController = {
  seeAllOrders: async (req, res, next) => {
    const allOrders = await orderService.seeAllOrdersServ();

    if (allOrders.length <= 0) {
      return res.status(404).json({ message: "No orders submited or found" });
    }
    return res.status(200).json(allOrders);
  },

  deleteOrder: async (req, res, next) => {
    // I will send the order's ID with req.params.

    const { id } = req.params;

    if (!id) {
      return res.json({
        message: "you have to set order's ID",
      });
    }

    try {
      await orderService.deleteOrderServ(id);

      return res.status(200).json({
        message: "Order deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  createOrder: async (req, res, next) => {
    // This method expects the ID and count with the JSON object.

    const { id, count } = req.body;
    const checkAvailable = await ticketService.getTicketServ(id);

    // here I need to access the stock of the ticket, so I call the ticket info to access the stock of them.
    // I minus the existed stock of previous ticket with user's count order.
    const newStock = Number(checkAvailable.stock) - Number(count);

    try {
      if (!checkAvailable) {
        return res.status(404).json({
          message: "Ticket not found",
        });
      }

      if (checkAvailable.stock < +count) {
        return res.status(404).json({
          message: `There is no more stock available, only ${checkAvailable.stock} of this ticket is available`,
        });
      }

      const order = await orderService.addNewOrderForUserServ({
        newStock: newStock,
        ticket_count: count,
        userId: req.user.id,
        ticketId: id,
        totalPrice: checkAvailable.unitPrice * +count,
      });

      return res.status(200).json({
        message: `New order with status RESERVED added successfully`,
        data: order,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = orderController;
