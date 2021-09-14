require("express-async-errors");
const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR : jwtPrivateKey not define");
  process.exit(1);
}
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
require("./startup/dbconnection")(); //database connection
require("./startup/prod")(app);
require("./startup/routes")(app); //requires routes here

const port = process.env.PORT || config.get("port");
//server
app.listen(port, "localhost", () => {
  console.log(`Server Listen at :${port}... `);
});
