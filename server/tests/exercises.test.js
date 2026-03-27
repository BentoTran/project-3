const request = require("supertest");
const app = require("../app");
const db = require("../db/knex");

describe("Exercises API", () => {
    test("GET /exercises should return all exercises", async () => {
        const response = await request(app).get("/exercises");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("GET /exercises/1 should return one exercise", async () => {
        const response = await request(app).get("/exercises/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
    });

    test("POST /exercises should create a new exercise", async () => {
        const newExercise = {
            name: "Test Curl",
            muscle_group: "Arms",
            equipment: "Dumbbells",
            description: "Test description",
        };

        const response = await request(app)
            .post("/exercises")
            .send(newExercise);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test Curl");
    });
});

afterAll(async () => {
    await db.destroy();
});