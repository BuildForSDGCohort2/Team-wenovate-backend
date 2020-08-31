const Connect = require("../controllers/Connect");

const validateConnectCredentials = require("../middlewares/validateRequestCredentials")
  .validateConnectCredentials;

const { addConnect, fetchConnect } = Connect;
const connect = (app) => {
  app.post("/api/connect", validateConnectCredentials, addConnect);
  app.get("/api/connect", fetchConnect);
};
module.exports = connect;
