const express = require("express");

const cors = require("cors");
const user = require("./routes/user");

//database connection
const database = require("./database");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors()); //enable cors

user(app);
// add more routes of this format routeName(app)

app.all("*", (req, res) => {
  res.send("welcome to wenovate backend ");
});

// start server
app.listen(port, () => console.log(`connected to ${port}`));
