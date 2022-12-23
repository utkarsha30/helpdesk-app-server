const { Errors } = require("../constants");
const resourceNotFound = (req, res, next) => {
  const error = Error(`API not supported`);
  error.name = "NotFound";
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const Status = {
    [Errors.NotFound]: 404,
    [Errors.ValidationError]: 400,
    [Errors.MongoServerError]: 500,
  };

  res.status(Status[err.name] || 500).json({
    status: "error",
    message: err.message,
  });
};

module.exports = {
  resourceNotFound,
  errorHandler,
};
