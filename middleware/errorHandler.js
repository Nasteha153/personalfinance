export const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.statusCode && err.statusCode < 500
        ? err.message
        : "Internal server error",
  });
};
