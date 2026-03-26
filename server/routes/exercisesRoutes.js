const express = require("express");
const router = express.Router();
const db = require("../db/knex");

// GET all exercises
router.get("/", async (req, res) => {
    try {
        const { muscle_group, equipment } = req.query;

        let query = db("exercises");

        if (muscle_group) {
            query = query.where("muscle_group", muscle_group);
        }

        if (equipment) {
            query = query.where("equipment", equipment);
        }

        const exercises = await query;

        res.status(200).json(exercises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get exercises" });
    }
});

// GET one exercise by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const exercise = await db("exercises").where({ id }).first();

        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.status(200).json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get exercise" });
    }
});

// Adds new exercise
router.post("/", async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { name, muscle_group, equipment, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const newExercise = await db("exercises")
            .insert({ name, muscle_group, equipment, description })
            .returning("*");

        res.status(201).json(newExercise[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create exercise" });
    }
});

// Allows updates to exercises via ids
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, muscle_group, equipment, description } = req.body;

        const updated = await db("exercises")
            .where({ id })
            .update({ name, muscle_group, equipment, description })
            .returning("*");

        if (!updated.length) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.status(200).json(updated[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update exercise" });
    }
});

// DELETE exercise by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await db("exercises").where({ id }).del();

        if (!deleted) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.status(200).json({ message: "Exercise deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete exercise" });
    }
});

module.exports = router;