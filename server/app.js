const express = require("express");
const cors = require("cors");

const workoutsRoutes = require("./routes/workoutsRoutes");
const exercisesRoutes = require("./routes/exercisesRoutes");
const workoutExercisesRoutes = require("./routes/workoutExercisesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Workout Planner API is running");
});

app.use("/workouts", workoutsRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/workouts", workoutExercisesRoutes);

module.exports = app;