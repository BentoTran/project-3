exports.up = function (knex) {
    return knex.schema
        .createTable("workouts", function (table) {
            table.increments("id").primary();
            table.string("name", 100).notNullable();
            table.string("difficulty", 50);
            table.integer("duration_minutes");
            table.string("focus_area", 100);
        })
        .createTable("exercises", function (table) {
            table.increments("id").primary();
            table.string("name", 100).notNullable();
            table.string("muscle_group", 100);
            table.string("equipment", 100);
            table.text("description");
        })
        .createTable("workout_exercises", function (table) {
            table.increments("id").primary();
            table.integer("workout_id").unsigned().notNullable();
            table.integer("exercise_id").unsigned().notNullable();
            table.integer("sets");
            table.integer("reps");

            table
                .foreign("workout_id")
                .references("id")
                .inTable("workouts")
                .onDelete("CASCADE");

            table
                .foreign("exercise_id")
                .references("id")
                .inTable("exercises")
                .onDelete("CASCADE");
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("workout_exercises")
        .dropTableIfExists("exercises")
        .dropTableIfExists("workouts");
};