const User = require("../controllers/User");
const validateRegisterCredentials = require("../middlewares/validateRequestCredentials")
  .validateRegisterCredentials;
const validateLoginCredentials = require("../middlewares/validateRequestCredentials")
  .validateLoginCredentials;

const { signUp, login } = User;

const user = (app) => {
  app.post("/api/user/signup", validateRegisterCredentials, signUp);
  app.post("/api/user/login", validateLoginCredentials, login);
};
module.exports = user;
