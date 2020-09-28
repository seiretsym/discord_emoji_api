// dependencies
const express = require("express");
const routes = require("./routes");

// middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// start server
const PORT = process.env.PORT || 3377;
app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});