# 🏋️ Workout Planner App

## 📌 Description

The Workout Planner App is a full-stack web application that allows users to create, manage, and organize workouts and exercises. Users can build custom workouts, assign exercises to workouts, and define sets and reps for each exercise.

This project demonstrates a complete full-stack architecture including a RESTful API, relational database design, and a modern React frontend.

---

## 🚀 Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express
* PostgreSQL
* Knex.js

### Dev Tools

* Docker & Docker Compose
* Jest & SuperTest

---

## 🗂️ Database Design

### Tables

#### Workouts

* id
* name
* difficulty
* duration_minutes
* focus_area

#### Exercises

* id
* name
* muscle_group
* equipment
* description

#### Workout_Exercises (Join Table)

* id
* workout_id (FK)
* exercise_id (FK)
* sets
* reps

### Relationships

* A workout can have many exercises
* An exercise can belong to many workouts
* Implemented using a many-to-many join table

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Start the application (Docker)

```bash
docker compose up --build
```

---

## 🧱 Database Setup

### Run migrations

```bash
docker exec -it workout_server npx knex migrate:latest
```

### Run seed data

```bash
docker exec -it workout_server npx knex seed:run
```

---

## 🧪 Running Tests

```bash
docker exec -it workout_server npm test
```

---

## 🌐 Application URLs

* Frontend: http://localhost:5173
* Backend API: http://localhost:3000

---

## 📡 API Endpoints

### 🏋️ Workouts

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /workouts     | Get all workouts |
| GET    | /workouts/:id | Get one workout  |
| POST   | /workouts     | Create workout   |
| PUT    | /workouts/:id | Update workout   |
| DELETE | /workouts/:id | Delete workout   |

#### Query Params

* `/workouts?difficulty=Beginner`
* `/workouts?focus_area=Upper Body`

---

### 💪 Exercises

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /exercises     | Get all exercises |
| GET    | /exercises/:id | Get one exercise  |
| POST   | /exercises     | Create exercise   |
| PUT    | /exercises/:id | Update exercise   |
| DELETE | /exercises/:id | Delete exercise   |

#### Query Params

* `/exercises?muscle_group=Chest`
* `/exercises?equipment=Barbell`

---

### 🔗 Workout Exercises (Nested Routes)

| Method | Endpoint                           | Description              |
| ------ | ---------------------------------- | ------------------------ |
| GET    | /workouts/:workoutId/exercises     | Get exercises in workout |
| POST   | /workouts/:workoutId/exercises     | Add exercise to workout  |
| PUT    | /workouts/:workoutId/exercises/:id | Update sets/reps         |
| DELETE | /workouts/:workoutId/exercises/:id | Remove exercise          |

---

## 🖥️ Frontend Features

### Workouts Page

* View all workouts
* Add new workouts
* Edit workouts
* Delete workouts
* Filter workouts by difficulty and focus area

### Exercises Page

* View all exercises
* Add new exercises
* Edit exercises
* Delete exercises
* Filter exercises by muscle group and equipment

### Workout Details Page

* View a single workout
* View exercises inside a workout
* Add exercises to a workout
* Remove exercises from a workout

---

## 🧠 Key Features

* Full CRUD functionality across all resources
* Query parameter filtering
* Nested RESTful routes
* Many-to-many relational database design
* Dockerized full-stack environment
* Responsive UI with Tailwind CSS
* Backend testing with Jest & SuperTest

---

## 📁 Project Structure

```txt
root/
  client/
    src/
      pages/
      App.jsx
      main.jsx
    Dockerfile

  server/
    db/
      migrations/
      seeds/
      knex.js
    routes/
      workoutsRoutes.js
      exercisesRoutes.js
      workoutExercisesRoutes.js
    tests/
      api.test.js
    app.js
    server.js
    knexfile.js

  docker-compose.yml
  README.md
```

---

## 🏁 Future Improvements

* User authentication (login/register)
* Save favorite workouts
* Workout history tracking
* Mobile UI improvements
* Deployment (Render, Railway, etc.)

---

## 👤 Author

Tran

---

## 📄 License

This project is for educational purposes.
