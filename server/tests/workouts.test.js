const request = require("supertest");
const app = require("../app");

describe("Workouts API", () => {
    test("GET /workouts should return all workouts", async () => {
        const response = await request(app).get("/workouts");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("GET /workouts/1 should return one workout", async () => {
        const response = await request(app).get("/workouts/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
    });

    test("POST /workouts should create a new workout", async () => {
        const newWorkout = {
            name: "Test Workout",
            difficulty: "Beginner",
            duration_minutes: 30,
            focus_area: "Full Body",
        };

        const response = await request(app)
            .post("/workouts")
            .send(newWorkout);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test Workout");
    });
    const db = require("../db/knex");

    afterAll(async () => {
        await db.destroy();
    });
});