const express = require("express");
const router = express.Router();
const db = require("../db/knex");

// GET all exercises for one workout
router.get("/:workoutId/exercises", async (req, res) => {
    try {
        const { workoutId } = req.params;

        const workoutExercises = await db("workout_exercises")
            .join("exercises", "workout_exercises.exercise_id", "exercises.id")
            .select(
                "workout_exercises.id",
                "workout_exercises.workout_id",
                "workout_exercises.exercise_id",
                "workout_exercises.sets",
                "workout_exercises.reps",
                "exercises.name",
                "exercises.muscle_group",
                "exercises.equipment",
                "exercises.description"
            )
            .where("workout_exercises.workout_id", workoutId);

        res.status(200).json(workoutExercises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get exercises for workout" });
    }
});

// POST add exercise to a workout
router.post("/:workoutId/exercises", async (req, res) => {
    try {
        const { workoutId } = req.params;
        const { exercise_id, sets, reps } = req.body;

        if (!exercise_id) {
            return res.status(400).json({ error: "exercise_id is required" });
        }

        const newWorkoutExercise = await db("workout_exercises")
            .insert({
                workout_id: workoutId,
                exercise_id,
                sets,
                reps,
            })
            .returning("*");

        res.status(201).json(newWorkoutExercise[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add exercise to workout" });
    }
});

// PUT update sets/reps for one workout_exercises row
router.put("/:workoutId/exercises/:id", async (req, res) => {
    try {
        const { workoutId, id } = req.params;
        const { exercise_id, sets, reps } = req.body;

        const updated = await db("workout_exercises")
            .where({
                id,
                workout_id: workoutId,
            })
            .update({
                exercise_id,
                sets,
                reps,
            })
            .returning("*");

        if (!updated.length) {
            return res.status(404).json({ error: "Workout exercise not found" });
        }

        res.status(200).json(updated[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update workout exercise" });
    }
});

// DELETE remove exercise from a workout
router.delete("/:workoutId/exercises/:id", async (req, res) => {
    try {
        const { workoutId, id } = req.params;

        const deleted = await db("workout_exercises")
            .where({
                id,
                workout_id: workoutId,
            })
            .del();

        if (!deleted) {
            return res.status(404).json({ error: "Workout exercise not found" });
        }

        res.status(200).json({ message: "Exercise removed from workout" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete workout exercise" });
    }
});

module.exports = router;