const Workouts = require('../models/Workout');

exports.list = async (req, res) => {
    console.log(req.session);
    try {

        const totalWorkouts = await Workouts.find({}).count();

        console.log(totalWorkouts)
        
        res.render("index", {totalWorkouts: totalWorkouts});
    }catch (e) {
        console.log(e)
        res.status(404).send({
            message: 'error rendering page',
        });
    }
}