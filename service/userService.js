const database = require("../utils/database");
const ObjectID = require("mongodb").ObjectId;
const userProperties = ["email", "password", "name"];
const validation = ["email", "password"];

async function create(data) {
  return await database.userModel().insert(data);
}
async function getDetailByCode(code) {
  const result = await database.userModel().findOneBy({ id: code });
  return result[0];
}

async function getDetailByEmail(email) {
  const result = await database.userModel().findOneBy({ email });
  return result;
}

module.exports = {
  create,
  getDetailByEmail,
  getDetailByCode,
  validation,
  userProperties,
};
