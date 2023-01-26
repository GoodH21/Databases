const Workout = require("../models/Workout");

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const workouts = await Workout.find({MuscleGroup: "Back"});
        res.render("Back", { workouts: workouts, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list workouts"});
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try{
        await Workout.findByIdAndRemove(id);
        res.redirect("/back");
    } catch (e) {
        res.status(404).send({
            message: `could not delete workout ${id}.`
        });
    }
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    try{
        const workouts = await Workout.findById(id);
        res.render('update-workout', { workouts: workouts, id: id});
    } catch (e) {
        res.status(404).send({
            message: `could not find workout ${id}`
        });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    try{
        const workouts = await Workout.updateOne({ _id: id}, req.body);
        res.redirect('/back');
    } catch (e) {
        res.status(404).send({
            message: `could not find workout ${id}`
        });
    }
};