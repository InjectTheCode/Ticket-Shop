const db = require("../../prisma/db");

const userService = {
  getAllUserServ: async () => {
    const getAll = await db.user.findMany();
    return getAll;
  },

  getUserByIdServ: async (id) => {
    const findedUSer = await db.user.findUnique({
      where: { id },
    });
    return findedUSer;
  },

  getUserByPhoneServ: async (phone) => {
    const findedUSer = await db.user.findUnique({
      where: { phone },
    });
    return findedUSer;
  },

  createUserServ: async (data) => {
    const newUser = await db.user.create({
      data,
    });
    return newUser;
  },

  updateUserByIdServ: async (id, data) => {
    const updatedUser = await db.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  },

  deleteUserByIdServ: async (id) => {
    const deletedUser = await db.user.delete({
      where: { id },
    });

    return deletedUser;
  },

  increaseWalletServ: async (phone, balance) => {
    const newWallet = await db.user.update({
      where: { phone },
      data: {
        balance,
      },
    });

    return newWallet;
  },
};

module.exports = userService;
