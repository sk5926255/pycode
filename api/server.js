const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const executionRoute = require("./routes/execution.route");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(
      "Database connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

dbConnect();

app.use("/execute", executionRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
