const userService = require("../service/userService.js");
const jwt = require("../utils/token");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function login(req, res) {
  try {
    const user = await userService.getDetailByEmail(req.body.email);
    if (!user) {
      return res.json({ errorCode: true, data: "Wrong email or password" });
    }
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) {
      return res.json({ errorCode: true, data: "Wrong email or password" });
    }
    user.token = await jwt.createSecretKey(req.body.email);
    delete user.password;
    return res.json({ errorCode: null, data: user });
  } catch (error) {
    return res.json({ errorCode: true, data: error });
  }
}
async function register(req, res) {
  try {
    const validation = req.body;
    for (property of userService.validation) {
      if (validation[property] === null || validation[property] === "") {
        return res.json({ errorCode: true, data: `Lack of ${property}` });
      }
    }
    const user = await userService.getDetailByEmail(req.body.email);
    if (user) {
      return res.json({ errorCode: true, data: "Existing email" });
    }
    if (req.body.rePassword) {
      const checkPass = req.body.password == req.body.rePassword;
      if (!checkPass) {
        return res.json({ errorCode: true, data: "Wrong retype password" });
      }
    }
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const data = {
      email: req.body.email,
      password: password,
      name: req.body.name,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await userService.create(data);
    delete data.password;
    return res.json({ errorCode: null, data: data });
  } catch (error) {
    return res.json({ errorCode: true, data: "System error" });
  }
}

module.exports = {
  login,
  register,
};
