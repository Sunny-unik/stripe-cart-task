const errorHandler = (error, _req, res, _next) => {
  console.error(error.stack);
  if (error.name === "ValidationError")
    return res.status(403).json({ error, message: "Invalid Data" });

  if (error.code && error.code === 11000)
    return res.status(409).json({ error, message: "Duplicate data" });

  const [code, message] = [500, "Internal Server Error"];
  res.status(code).send({ message });
};

module.exports = errorHandler;
