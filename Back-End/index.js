require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const boardRoutes = require("./routes/boardRoute");
const userRoutes = require("./routes/userRoute")

require('./config/passport/passport')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/board", boardRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});