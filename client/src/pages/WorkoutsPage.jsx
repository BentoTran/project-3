import { useEffect, useState } from "react";

function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [focusArea, setFocusArea] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/workouts")
            .then((res) => res.json())
            .then((data) => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching workouts:", error);
                setLoading(false);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        const newWorkout = {
            name: name,
            difficulty: difficulty,
            duration_minutes: Number(durationMinutes),
            focus_area: focusArea,
        };

        fetch("http://localhost:3000/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newWorkout),
        })
            .then((res) => res.json())
            .then((data) => {
                setWorkouts([...workouts, data]);
                setName("");
                setDifficulty("");
                setDurationMinutes("");
                setFocusArea("");
            })
            .catch((error) => {
                console.error("Error creating workout:", error);
            });
    }

    function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this workout?");

        if (!confirmed) {
            return;
        }

        fetch(`http://localhost:3000/workouts/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const filteredWorkouts = workouts.filter((workout) => workout.id !== id);
                setWorkouts(filteredWorkouts);
            })
            .catch((error) => {
                console.error("Error deleting workout:", error);
            });
    }
    if (loading) {
        return <p>Loading workouts...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Workouts</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
            >
                <h3 className="text-xl font-bold">Add a Workout</h3>

                <input
                    type="text"
                    placeholder="Workout name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Duration in minutes"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Focus area"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Add Workout
                </button>
            </form>

            {workouts.length === 0 ? (
                <p>No workouts found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {workouts.map((workout) => (
                        <div key={workout.id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-xl font-bold">{workout.name}</h3>
                            <p className="mt-2">Difficulty: {workout.difficulty}</p>
                            <p>Duration: {workout.duration_minutes} minutes</p>
                            <p>Focus Area: {workout.focus_area}</p>

                            <button
                                onClick={() => handleDelete(workout.id)}
                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WorkoutsPage;