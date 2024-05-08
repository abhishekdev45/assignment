const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const mainRoute = require("./routes/main");


app.use(cors());
app.use(express.json());

app.use("/api", mainRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Node App running ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
