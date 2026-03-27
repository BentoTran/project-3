import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function WorkoutDetailsPage() {
    const { id } = useParams();

    const [workout, setWorkout] = useState(null);
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedExerciseId, setSelectedExerciseId] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:3000/workouts/${id}`).then((res) => res.json()),
            fetch(`http://localhost:3000/workouts/${id}/exercises`).then((res) =>
                res.json()
            ),
            fetch("http://localhost:3000/exercises").then((res) => res.json()),
        ])
            .then(([workoutData, workoutExercisesData, allExercisesData]) => {
                setWorkout(workoutData);
                setWorkoutExercises(workoutExercisesData);
                setAllExercises(allExercisesData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching workout details:", error);
                setLoading(false);
            });
    }, [id]);

    function handleAddExercise(e) {
        e.preventDefault();

        if (!selectedExerciseId || !sets || !reps) {
            return;
        }

        const newWorkoutExercise = {
            exercise_id: Number(selectedExerciseId),
            sets: Number(sets),
            reps: Number(reps),
        };

        fetch(`http://localhost:3000/workouts/${id}/exercises`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newWorkoutExercise),
        })
            .then((res) => res.json())
            .then(() => {
                return fetch(`http://localhost:3000/workouts/${id}/exercises`);
            })
            .then((res) => res.json())
            .then((updatedExercises) => {
                setWorkoutExercises(updatedExercises);
                setSelectedExerciseId("");
                setSets("");
                setReps("");
            })
            .catch((error) => {
                console.error("Error adding exercise to workout:", error);
            });
    }
    function handleDeleteExercise(workoutExerciseId) {
        const confirmed = window.confirm("Are you sure you want to remove this exercise from the workout?");

        if (!confirmed) {
            return;
        }

        fetch(`http://localhost:3000/workouts/${id}/exercises/${workoutExerciseId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const filteredExercises = workoutExercises.filter(
                    (exercise) => exercise.id !== workoutExerciseId
                );
                setWorkoutExercises(filteredExercises);
            })
            .catch((error) => {
                console.error("Error removing exercise from workout:", error);
            });
    }
    if (loading) {
        return <p>Loading workout details...</p>;
    }

    if (!workout || workout.error) {
        return <p>Workout not found.</p>;
    }

    return (
        <div>
            <Link
                to="/workouts"
                className="inline-block mb-6 text-blue-600 hover:underline"
            >
                ← Back to Workouts
            </Link>

            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-3xl font-bold">{workout.name}</h2>
                <p className="mt-3">Difficulty: {workout.difficulty}</p>
                <p>Duration: {workout.duration_minutes} minutes</p>
                <p>Focus Area: {workout.focus_area}</p>
            </div>

            <form
                onSubmit={handleAddExercise}
                className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
            >
                <h3 className="text-xl font-bold">Add Exercise to Workout</h3>

                <select
                    value={selectedExerciseId}
                    onChange={(e) => setSelectedExerciseId(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Select an exercise</option>
                    {allExercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Sets"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Reps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Add Exercise
                </button>
            </form>

            <div>
                <h3 className="text-2xl font-semibold mb-4">Exercises in this Workout</h3>

                {workoutExercises.length === 0 ? (
                    <p>No exercises added to this workout yet.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {workoutExercises.map((exercise) => (
                            <div key={exercise.id} className="bg-white p-4 rounded-lg shadow">
                                <h4 className="text-xl font-bold">{exercise.name}</h4>
                                <p className="mt-2">Muscle Group: {exercise.muscle_group}</p>
                                <p>Equipment: {exercise.equipment}</p>
                                <p>Sets: {exercise.sets}</p>
                                <p>Reps: {exercise.reps}</p>

                                <button
                                    onClick={() => handleDeleteExercise(exercise.id)}
                                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                                >
                                    Remove from Workout
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkoutDetailsPage;