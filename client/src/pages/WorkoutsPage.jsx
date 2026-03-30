import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [focusArea, setFocusArea] = useState("");

    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [focusAreaFilter, setFocusAreaFilter] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    function fetchWorkouts(url = "http://localhost:3000/workouts") {
        setLoading(true);

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching workouts:", error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    function resetForm() {
        setName("");
        setDifficulty("");
        setDurationMinutes("");
        setFocusArea("");
        setEditingId(null);
        setShowModal(false);
    }

    function openAddModal() {
        setEditingId(null);
        setName("");
        setDifficulty("");
        setDurationMinutes("");
        setFocusArea("");
        setShowModal(true);
    }

    function openEditModal(workout) {
        setEditingId(workout.id);
        setName(workout.name || "");
        setDifficulty(workout.difficulty || "");
        setDurationMinutes(workout.duration_minutes || "");
        setFocusArea(workout.focus_area || "");
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        const workoutData = {
            name: name,
            difficulty: difficulty,
            duration_minutes: Number(durationMinutes),
            focus_area: focusArea,
        };

        if (editingId) {
            fetch(`http://localhost:3000/workouts/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(workoutData),
            })
                .then((res) => res.json())
                .then((updatedWorkout) => {
                    const updatedWorkouts = workouts.map((workout) =>
                        workout.id === editingId ? updatedWorkout : workout
                    );

                    setWorkouts(updatedWorkouts);
                    resetForm();
                })
                .catch((error) => {
                    console.error("Error updating workout:", error);
                });
        } else {
            fetch("http://localhost:3000/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(workoutData),
            })
                .then((res) => res.json())
                .then((data) => {
                    setWorkouts([...workouts, data]);
                    resetForm();
                })
                .catch((error) => {
                    console.error("Error creating workout:", error);
                });
        }
    }

    function handleDelete(id) {
        fetch(`http://localhost:3000/workouts/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const filteredWorkouts = workouts.filter((workout) => workout.id !== id);
                setWorkouts(filteredWorkouts);

                if (editingId === id) {
                    resetForm();
                }
            })
            .catch((error) => {
                console.error("Error deleting workout:", error);
            });
    }

    function handleFilter() {
        let url = "http://localhost:3000/workouts?";
        const params = [];

        if (difficultyFilter) {
            params.push(`difficulty=${encodeURIComponent(difficultyFilter)}`);
        }

        if (focusAreaFilter) {
            params.push(`focus_area=${encodeURIComponent(focusAreaFilter)}`);
        }

        url += params.join("&");
        fetchWorkouts(url);
    }

    function handleClearFilters() {
        setDifficultyFilter("");
        setFocusAreaFilter("");
        fetchWorkouts();
    }

    if (loading) {
        return <p>Loading workouts...</p>;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-3xl font-bold">Workouts</h2>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
                >
                    Add Workout
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
                <h3 className="text-xl font-bold">Filter Workouts</h3>

                <input
                    type="text"
                    placeholder="Filter by difficulty"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                />

                <input
                    type="text"
                    placeholder="Filter by focus area"
                    value={focusAreaFilter}
                    onChange={(e) => setFocusAreaFilter(e.target.value)}
                    className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                />

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleFilter}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                    >
                        Apply Filters
                    </button>

                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {workouts.length === 0 ? (
                <p className="bg-white p-6 rounded-xl shadow text-slate-600">
                    No workouts found.
                </p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {workouts.map((workout) => (
                        <div key={workout.id} className="bg-white p-5 rounded-xl shadow">
                            <Link to={`/workouts/${workout.id}`}>
                                <h3 className="text-xl font-bold text-blue-600 hover:underline">
                                    {workout.name}
                                </h3>
                            </Link>

                            <p className="mt-2">Difficulty: {workout.difficulty}</p>
                            <p>Duration: {workout.duration_minutes} minutes</p>
                            <p>Focus Area: {workout.focus_area}</p>

                            <div className="mt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => openEditModal(workout)}
                                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(workout.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold">
                                {editingId ? "Edit Workout" : "Add Workout"}
                            </h3>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-slate-500 hover:text-slate-800 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Workout name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                            />

                            <input
                                type="text"
                                placeholder="Difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                            />

                            <input
                                type="number"
                                placeholder="Duration in minutes"
                                value={durationMinutes}
                                onChange={(e) => setDurationMinutes(e.target.value)}
                                className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                            />

                            <input
                                type="text"
                                placeholder="Focus area"
                                value={focusArea}
                                onChange={(e) => setFocusArea(e.target.value)}
                                className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
                                >
                                    {editingId ? "Update Workout" : "Add Workout"}
                                </button>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkoutsPage;