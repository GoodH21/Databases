const Workout = require("../models/Workout");


exports.list = async (req, res) => {
  try {
    console.log(req.query)
    const message = req.query.message
    const workouts = await Workout.find({});
    res.render("workouts", { workouts: workouts, message: message });
  } catch (e) {
    res.status(404).send({ message: "could not list workouts" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Workout.findByIdAndRemove(id);
    res.redirect("/workouts");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try{
      const workout = await Workout.findById(id);
      res.render('edit-workout', { workout: workout, id: id});
  } catch (e) {
      res.status(404).send({
          message: `could not find workout ${id}`
      });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try{
      const workout = await Workout.updateOne({ _id: id}, req.body);
      res.redirect('/workouts');
  } catch (e) {
      res.status(404).send({
          message: `could not find workout ${id}`
      });
  }
};

exports.create = async (req, res) => {

  try {
    const workout = new Workout({ 
        Exercise: req.body.Exercise,
        MuscleGroup: req.body.MuscleGroup,
        Sets: req.body.Sets,
        Reps: req.body.Reps,
        Weight: req.body.Weight,
        CaloriesBurned: req.body.CaloriesBurned
      });
    await workout.save();
    res.redirect('/workouts')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render('create-workout', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
};