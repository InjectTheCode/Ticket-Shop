const userService = require("./userService");

const userController = {
  getAllUsers: async (next) => {
    try {
      const allUser = await userService.getAllUserServ();
      res.status(200).json(allUser);
    } catch (error) {
      next(error);
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
        const showUserById = await userService.getUserByIdServ(+id);
        res.status(200).json(showUserById);
      }
    } catch (error) {
      next(error);
    }
  },

  registerUser: async (req, res, next) => {
    try {
      const newUser = await userService.createUserServ({ ...req.body });
      const result = {
        message: "This user has been registered",
        data: newUser,
      };
      res.status(200).json(result);
    } catch (error) {
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
      next(error);
    }
  },
};

module.exports = userController;
