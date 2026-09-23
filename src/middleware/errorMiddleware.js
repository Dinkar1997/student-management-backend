const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.message === "User already exists") {
    return res.status(409).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "Invalid email or password") {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    status: false,
    success: false,
    message,
  });
};

module.exports = errorHandler;