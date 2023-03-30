const { body } = require("express-validator");

// this validator checks doen't send the empty id and count.
exports.addOrderToUser = [
  body("id").notEmpty(),
  body("count").notEmpty().isInt(),
];
