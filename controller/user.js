const userService = require("../service/userService.js");
const jwt = require("../utils/token");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function login(req, res) {
  try {
    const user = await userService.getDetailByUsername(req.body.username);
    if (!user) {
      return res.json({ success: false, msg: "Wrong username or password" });
    }
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) {
      return res.json({ success: false, msg: "Wrong username or password" });
    }
    user.token = await jwt.createSecretKey({ username: req.body.username });
    delete user.password;
    delete user.id;
    delete user.createdAt;
    delete user.updatedAt;
    return res.json({ success: true, msg: "OK", ...user });
  } catch (error) {
    return res.json({ success: false, msg: error || "System error" });
  }
}
async function register(req, res) {
  try {
    const validation = req.body;
    for (property of userService.validation) {
      if (validation[property] === null || validation[property] === "") {
        return res.json({ success: false, msg: `Lack of ${property}` });
      }
    }
    const user = await userService.getDetailByUsername(req.body.username);
    if (user) {
      return res.json({ success: false, msg: "Existing username" });
    }
    if (req.body.rePassword) {
      const checkPass = req.body.password == req.body.rePassword;
      if (!checkPass) {
        return res.json({ success: true, msg: "Wrong retype password" });
      }
    }
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const data = {
      username: req.body.username,
      password: password,
      fullname: req.body.fullname,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await userService.create(data);
    delete data.password;
    delete data.id;
    return res.json({ success: null, msg: "OK", ...data });
  } catch (error) {
    return res.json({ success: true, msg: "System error" });
  }
}

module.exports = {
  login,
  register,
};
