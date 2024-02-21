require("dotenv").config();
require("./config/passport/passport");

const express = require("express");
const app = express();
const cors = require("cors");

const boardRoutes = require("./routes/boardRoute");
const userRoutes = require("./routes/userRoute");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// UI system
app.use("/board", boardRoutes);

// Register , Login system
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
