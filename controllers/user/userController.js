const userService = require("./userService");
const bcrypt = require("bcrypt");

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const allUser = await userService.getAllUserServ();
      if (allUser.length < 1) {
        res.status(200).json({
          message: "there is no user exist in the database",
        });
      } else {
        res.status(200).json(allUser);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(404).json({
          message: "User does not exist!",
        });
      } else {
        const showUserById = await userService.getUserByIdServ(id);
        res.status(200).json(showUserById);
      }
    } catch (error) {
      next(error);
    }
  },

  getUserByPhone: async (req, res, next) => {
    try {
      const { phone } = req.params;
      if (!phone) {
        res.status(404).json({
          message: "User does not exist!",
        });
      } else {
        const showUserById = await userService.getUserByPhoneServ(phone);
        res.status(200).json(showUserById);
      }
    } catch (error) {
      next(error);
    }
  },

  registerUser: async (req, res, next) => {
    try {
      const { password, fname } = req.body;
      console.log(password, fname);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await userService.createUserServ({
        ...req.body,
        password: hashedPassword,
      });
      const result = {
        message: `The ${fname} user has been registered`,
        data: newUser,
      };
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const updatedUser = await userService.updateUserByIdServ(+id, data);
      res.satus(204).json(updatedUser);
    } catch (error) {
      // next(error);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(404).json({
          message: "User does not exist or was deleted!",
        });
      } else {
        const deletedUser = await userService.deleteUserByIdServ(id);
        return res.status(204).send(`User ${deletedUser.fname} was deleted`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  increaseWallet: async (req, res, next) => {
    try {
      const { phone, balance } = req.body;
      if (!phone) {
        res.status(404).json({
          message: "User does not exist or couldn't find!",
        });
      } else {
        const increaseUserWallet = await userService.increaseWalletServ(
          phone,
          balance
        );
        const result = {
          message: `User ${phone} has changed his wallet`,
          data: increaseUserWallet,
        };
        res.status(204).json({
          message: `Usee ${increaseUserWallet.fname} increased the wallet for ${balance}`,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = userController;
