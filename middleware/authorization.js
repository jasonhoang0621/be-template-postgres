const jwt = require("../utils/token.js");
const userService = require("../service/userService.js");

async function userAuthentication(req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        errorCode: true,
        data: "No token provided",
      });
    }

    let verify = false;
    try {
      verify = await jwt.verifyToken(token);
    } catch (e) {
      res.status(401);
      return res.json({
        errorCode: true,
        data: "Invalid token",
      });
    }
    if (!verify) {
      return res.status(403).json({
        errorCode: true,
        data: "Expired token",
      });
    }
    const user = await userService.getDetailByUsername(verify?.username);
    if (user.length == 0 || user.length > 1) {
      return res.status(401).json({
        errorCode: true,
        data: "No user found",
      });
    }

    req.user = (({ id, username }) => ({
      id,
      username,
    }))(user);

    return next();
  } catch (error) {
    return res.json({ errorCode: true, data: "system error" });
  }
}

module.exports = {
  userAuthentication,
};
