require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutsRouter = require("./routes/workouts");
const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/workouts", workoutsRouter);

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
