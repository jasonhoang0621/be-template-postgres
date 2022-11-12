const { DataSource } = require("typeorm");
const userEntity = require("../entity/user.js");
require("dotenv").config();

let _userModel = null;

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["./entity/*.js"],
});

async function connectDatabase(callback) {
  try {
    dataSource.initialize().then(() => {
      callback();
      dataSource.createEntityManager();
      _userModel = dataSource.getRepository(userEntity);
    });
  } catch (e) {
    console.error(e);
  }
}

const userModel = function () {
  if (_userModel == null) {
    console.log("Instance is null or undefined");
  } else {
    return _userModel;
  }
};

module.exports = {
  userModel,
  connectDatabase,
  dataSource,
};
