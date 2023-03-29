exports.checkAdmin = async (req, res, next) => {
  //   if (!req.user) {
  //     return res.json({
  //       message: "Before do anything, you must be logged in",
  //     });
  //   }

  if (req.user.role === "ADMIN") {
    next();
  } else {
    const error = new Error();
    error.message = "access denied, you dont have permission";
    error.status = 403;

    next(error);
  }
};
