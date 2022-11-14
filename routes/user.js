commands = [
  {
    name: "login",
    controller: "user",
    method: "post",
    api: "/authenticate",
    middleware: ["userAuthentication"],
  },
  {
    name: "register",
    controller: "user",
    method: "post",
    api: "/register",
    middleware: [],
  },
];
module.exports = commands;
