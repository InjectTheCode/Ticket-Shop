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
};

module.exports = userService;
