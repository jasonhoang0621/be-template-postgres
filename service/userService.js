const database = require("../utils/database");
const ObjectID = require("mongodb").ObjectId;
const userProperties = ["username", "password", "fullname"];
const validation = ["username", "password"];

async function create(data) {
  return await database.userModel().insert(data);
}
async function getDetailByCode(code) {
  const result = await database.userModel().findOneBy({ id: code });
  return result[0];
}

async function getDetailByUsername(username) {
  const result = await database.userModel().findOneBy({ username });
  return result;
}

module.exports = {
  create,
  getDetailByUsername,
  getDetailByCode,
  validation,
  userProperties,
};
