const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const clientToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(clientToken, process.env.JWT_SECRET);

    if (decoded) {
      res.locals.userId = decoded.user_id;
      next();
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ error: "token expired" });
  }
};

exports.verifyToken = verifyToken;
