const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
const todoRoutes = require("./src/routes/todoRoutes");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB connection established");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

connectToDB()
  .then(() => {
    console.log("Server is starting...");
    app.listen(8080, () => {
      console.log("Server started on port 8080");
    });
  })
  .catch((err) => {
    console.error(err);
  });
