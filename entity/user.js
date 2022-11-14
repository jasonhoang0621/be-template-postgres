const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
      default: "123456",
    },
    fullname: {
      type: "varchar",
    },
    createdAt: {
      type: "date",
    },
    updatedAt: {
      type: "date",
    },
  },
});
