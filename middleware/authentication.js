const jwt = require("jsonwebtoken");

const auth = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ message: "Token é obrigatório!" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const password = process.env.JWT_SECRET;
    await jwt.verify(token, password);

    next();
  } catch (error) {
    return response.status(401).json({ message: "Token inválido" });
  }
};

module.exports = auth;
