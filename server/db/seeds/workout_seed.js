exports.seed = async function (knex) {
  await knex("workout_exercises").del();
  await knex("exercises").del();
  await knex("workouts").del();

  await knex("workouts").insert([
    {
      id: 1,
      name: "Push Day",
      difficulty: "Beginner",
      duration_minutes: 45,
      focus_area: "Upper Body",
    },
    {
      id: 2,
      name: "Pull Day",
      difficulty: "Intermediate",
      duration_minutes: 50,
      focus_area: "Back and Biceps",
    },
    {
      id: 3,
      name: "Leg Day",
      difficulty: "Beginner",
      duration_minutes: 60,
      focus_area: "Lower Body",
    },
  ]);

  await knex("exercises").insert([
    {
      id: 1,
      name: "Bench Press",
      muscle_group: "Chest",
      equipment: "Barbell",
      description: "A compound chest exercise performed on a bench.",
    },
    {
      id: 2,
      name: "Push Up",
      muscle_group: "Chest",
      equipment: "Bodyweight",
      description: "A bodyweight pushing exercise.",
    },
    {
      id: 3,
      name: "Deadlift",
      muscle_group: "Back",
      equipment: "Barbell",
      description: "A compound lift that targets the posterior chain.",
    },
    {
      id: 4,
      name: "Lat Pulldown",
      muscle_group: "Back",
      equipment: "Machine",
      description: "A pulling exercise for the upper back and lats.",
    },
    {
      id: 5,
      name: "Squat",
      muscle_group: "Legs",
      equipment: "Barbell",
      description: "A compound lower body exercise.",
    },
  ]);

  await knex("workout_exercises").insert([
    { id: 1, workout_id: 1, exercise_id: 1, sets: 4, reps: 8 },
    { id: 2, workout_id: 1, exercise_id: 2, sets: 3, reps: 12 },
    { id: 3, workout_id: 2, exercise_id: 3, sets: 4, reps: 6 },
    { id: 4, workout_id: 2, exercise_id: 4, sets: 3, reps: 10 },
    { id: 5, workout_id: 3, exercise_id: 5, sets: 4, reps: 8 },
  ]);

  await knex.raw(`
    SELECT setval('"workouts_id_seq"', (SELECT MAX(id) FROM workouts));
  `);

  await knex.raw(`
    SELECT setval('"exercises_id_seq"', (SELECT MAX(id) FROM exercises));
  `);

  await knex.raw(`
    SELECT setval('"workout_exercises_id_seq"', (SELECT MAX(id) FROM workout_exercises));
  `);
};