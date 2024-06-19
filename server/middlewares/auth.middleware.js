const jwt = require("jsonwebtoken");
// const publicKey = process.env.PUBLIC_KEY;

const { publicKey } = JSON.parse(process.env.PUBLIC_KEY)


const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next({ status: 401, error: "Unauthorized access" });
    }

    const { id } = jwt.verify(token, publicKey);

    if (!id) {
      return next({ status: 401, error: "Unauthorized access" });
    }

    req.userId = id;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authMiddleware;
