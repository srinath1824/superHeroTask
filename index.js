const express = require("express");
const task = require("./routes");
const app = express();
require("dotenv").config();

let port = process.env.PORT || 5000;
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", task);

app.listen(port, () => {
  console.log(`listining to port ${port}`);
});
