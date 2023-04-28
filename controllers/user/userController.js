const userService = require("./userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dao = require("../../utils/DAO");
const daoArray = require("../../utils/DAO");

const userController = {
  login: async (req, res, next) => {
    try {
      const { phone, password } = req.body;
      const userInfo = await userService.getUserByPhoneServ(phone);

      if (!userInfo) {
        return res.status(403).json({
          message: "Invalid ceridential",
        });
      }

      const validPassword = await bcrypt.compare(password, userInfo.password);

      if (!validPassword) {
        return res.status(403).json({
          message: "Invalid ceridential",
        });
      }

      const token = jwt.sign(
        { phone: userInfo.phone },
        process.env.SECRET_KEY,
        {
          expiresIn: Number(process.env.TOKEN_EXPIRE_TIME),
        }
      );

      const refreshTokenJWT = jwt.sign(
        { phone: userInfo.phone },
        process.env.SECRET_REFRESH_KEY,
        {
          expiresIn: Number(process.env.TOKEN_REFRESH_TIME),
        }
      );

      let expiredAt = new Date();
      expiredAt.setSeconds(
        expiredAt.getSeconds() + process.env.TOKEN_REFRESH_TIME
      );

      await userService.setRefreshTokenServ({
        token: refreshTokenJWT,
        userRefreshToken: userInfo.id,
        expiryDate: expiredAt,
      });

      return res.json({
        access_token: token,
        refreshToken: refreshTokenJWT,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  generateNewAccessToken: async (req, res, next) => {
    try {
      const { phone } = req.body;
      console.log("================================================");
      console.log(phone);
      const userInfo = await userService.getUserByPhoneServ(phone);
      if (!userInfo) {
        return res.status(403).json({
          message: "Invalid ceridential",
        });
      }

      const token = jwt.sign(
        { phone: userInfo.phone },
        process.env.SECRET_KEY,
        {
          expiresIn: Number(process.env.TOKEN_EXPIRE_TIME),
        }
      );

      return res.json({
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const allUser = await userService.getAllUserServ();
      if (allUser.length < 1) {
        res.status(200).json({
          message: "there is no user exist in the database",
        });
      } else {
        res.status(200).json({
          data: daoArray(allUser, "password"),
        });
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await userService.createUserServ({
        ...req.body,
        password: hashedPassword,
      });
      dao(newUser, "password");
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
