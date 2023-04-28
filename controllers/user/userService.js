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

  // createTokenServ: async (data) => {
  //   const { expiryDate } = data;
  //   console.log(data.user.id);
  //   console.log("================================================");
  //   return await db.refreshToken.create({
  //     data: {
  //       expiryDate: expiryDate,
  //       userRefreshToken: data.user.id,
  //     },
  //   });
  // },

  // getRefreshTokenServ: async (id) => {
  //   return await db.refreshToken.findUnique({
  //     where: { userRefreshToken: id },
  //   });
  // },

  setRefreshTokenServ: async (data) => {
    await db.refreshToken.create({
      data: {
        token: data.token,
        userRefreshToken: data.userRefreshToken,
        expiryDate: data.expiryDate,
      },
    });
  },
};

module.exports = userService;
