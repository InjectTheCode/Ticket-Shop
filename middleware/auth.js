const jwt = require("jsonwebtoken");
const userService = require("../controllers/user/userService");
const db = require("../prisma/db");

exports.tokenAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({
      message: "token should be provided in headers!!",
    });
  }

  const token = authorization.includes("Bearer")
    ? authorization.split(" ")[1]
    : authorization;

  try {
    const { phone } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userService.getUserByPhoneServ(phone);
    req.user = user;
    next();
  } catch (error) {
    console.log("error token");
    return res.status(403).json({
      message: "invalid Token",
    });
  }
};
