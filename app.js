require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

const homeController = require("./controllers/home");
const workoutController = require("./controllers/workouts");
const userController = require("./controllers/user");
const armsController = require("./controllers/arms");
const backController = require("./controllers/back");
const chestController = require("./controllers/chest");
const legsController = require("./controllers/legs");
const exerciseApiController = require("./controllers/api/searching-exercises");
const User = require("./models/User");

const app = express();
app.set("view engine", "ejs");

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

app.get("/", homeController.list);

app.get("/workouts", workoutController.list);
app.get("/workouts/delete/:id", workoutController.delete);
app.get("/workouts/update/:id", workoutController.edit);
app.post("/workouts/update/:id", workoutController.update);

app.get("/arms", armsController.list);
app.get("/arms/delete/:id", armsController.delete);
app.get("/arms/update/:id", armsController.edit);
app.post("/arms/update/:id", armsController.update);

app.get("/back", backController.list);
app.get("/back/delete/:id", backController.delete);
app.get("/back/update/:id", backController.edit);
app.post("/back/update/:id", backController.update);

app.get("/chest", chestController.list);
app.get("/chest/delete/:id", chestController.delete);
app.get("/chest/update/:id", chestController.edit);
app.post("/chest/update/:id", chestController.update);

app.get("/legs", legsController.list);
app.get("/legs/delete/:id", legsController.delete);
app.get("/legs/update/:id", legsController.edit);
app.post("/legs/update/:id", legsController.update);

app.get("/create-workout", authMiddleware, (req, res) => {
  res.render("create-workout", { errors: {} });
});
app.post("/create-workout", workoutController.create);


app.get("/login", (req, res) => {
  res.render('login', { errors: {} })
});
app.post("/login", userController.login);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/search-exercise",(req,res) => {
  res.render('search-exercise', exerciseApiController);
});
app.get("/api/searching-exercises", exerciseApiController.list);


app.listen(PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });