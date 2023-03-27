const errorHandler = (req, res, next, error) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

module.exports = errorHandler;
