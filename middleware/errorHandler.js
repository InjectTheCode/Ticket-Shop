const errorHandler = (error, req, res, next) => {
  // res.status(error.status || 500);
  // res.send({
  //   status: error.status || 500,
  //   message: error.message,
  // });
  // return next(error);

  if (error.status === 406) {
    res.status(error.status).send(error.message).end();
  } else if (error.status || error.statusCode) {
    res
      .status(error.status || error.statusCode)
      .send({ error: error.name || error.error, message: error.message })
      .end();
  } else {
    return next(error);
  }
};

module.exports = errorHandler;

// const errorHandler = (
//   error,
//   req
//   res,
//   next
// ) => {
//   if (error.code || error.statusCode) {
//     return res
//       .status(error.code || error.statusCode)
//       .json({
//         error: {
//           status: true,
//           code: error.code || error.statusCode,
//           message: error.message,
//         },
//       })
//       .end();
//   } else {
//     next(error);
//   }
// };
