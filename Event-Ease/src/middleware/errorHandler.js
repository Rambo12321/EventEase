export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: JSON.parse(errorMessage),
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
