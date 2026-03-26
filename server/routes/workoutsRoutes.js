const express = require("express");
const router = express.Router();
const db = require("../db/knex");

//Gets everything from workouts DB with queries for "difficulty" and "focus area""
router.get("/", async (req, res) => {
    try {
        const { difficulty, focus_area } = req.query;

        let query = db("workouts");

        if (difficulty) {
            query = query.where("difficulty", difficulty);
        }

        if (focus_area) {
            query = query.where("focus_area", focus_area);
        }

        const workouts = await query;

        res.status(200).json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get workouts" });
    }
});

// Gets just the on workout via its id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const workout = await db("workouts").where({ id }).first();

        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.status(200).json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get workout" });
    }
});

// Adds new workout to the table
router.post("/", async (req, res) => {
    try {
        console.log(req.body);

        const { name, difficulty, duration_minutes, focus_area } = req.body;

        const newWorkout = await db("workouts")
            .insert({
                name,
                difficulty,
                duration_minutes,
                focus_area,
            })
            .returning("*");

        res.status(201).json(newWorkout[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create workout" });
    }
});

// Allows for updates to workouts via ids.
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, difficulty, duration_minutes, focus_area } = req.body;

        const updated = await db("workouts")
            .where({ id })
            .update({ name, difficulty, duration_minutes, focus_area })
            .returning("*");

        if (!updated.length) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.status(200).json(updated[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update workout" });
    }
});

// Deletes the workout via id.
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await db("workouts").where({ id }).del();

        if (!deleted) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.status(200).json({ message: "Workout deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete workout" });
    }
});
module.exports = router;
