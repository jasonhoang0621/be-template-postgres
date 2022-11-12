const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
      default: "123456",
    },
    name: {
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
