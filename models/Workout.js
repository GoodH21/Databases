const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    Exercise: String,
    MuscleGroup: String,
    Sets: Number,
    Reps: Number,
    Weight: Number,
    CaloriesBurned: Number,
  },
  { timestamps: true }
);

workoutSchema.index({'$**': 'text'});
module.exports = mongoose.model("Workout", workoutSchema);