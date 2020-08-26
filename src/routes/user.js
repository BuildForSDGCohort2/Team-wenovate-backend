const User = require("../controllers/User");

const { signUp } = User;

const user = (app) => {
  app.post("/api/user/signup", signUp);
  // app.post("/api/user/login", "add a login static method to user class");
};
module.exports = user;
