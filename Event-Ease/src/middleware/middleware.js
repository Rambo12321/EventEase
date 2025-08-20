const apiKeyAuth = (req, res, next) => {
  const apiKey = req.header("api-key");
  req.time = new Date().toISOString();
  if (!(apiKey == "1234")) {
    res.status(401).json({ Error: "Not Authorized" });
  }
  next();
};

export default apiKeyAuth;
