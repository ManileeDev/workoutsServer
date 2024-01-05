require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutsRouter = require("./routes/workouts");
const usersRouter = require("./routes/users")
const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use("/api/workouts", workoutsRouter);
app.use("/api/users",usersRouter)
mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
