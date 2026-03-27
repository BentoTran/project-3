const request = require("supertest");
const app = require("../app");
const db = require("../db/knex");

describe("Workout Planner API", () => {
    test("GET /workouts should return all workouts", async () => {
        const response = await request(app).get("/workouts");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /exercises should return all exercises", async () => {
        const response = await request(app).get("/exercises");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /workouts should create a workout", async () => {
        const response = await request(app)
            .post("/workouts")
            .send({
                name: "Test Workout",
                difficulty: "Beginner",
                duration_minutes: 25,
                focus_area: "Core",
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Test Workout");
    });
});

afterAll(async () => {
    await db.destroy();
});