import { useEffect, useState } from "react";

function ExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [equipment, setEquipment] = useState("");
    const [description, setDescription] = useState("");

    const [muscleGroupFilter, setMuscleGroupFilter] = useState("");
    const [equipmentFilter, setEquipmentFilter] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    function fetchExercises(url = "http://localhost:3000/exercises") {
        setLoading(true);

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setExercises(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching exercises:", error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchExercises();
    }, []);

    function resetForm() {
        setName("");
        setMuscleGroup("");
        setEquipment("");
        setDescription("");
        setEditingId(null);
        setShowModal(false);
    }

    function openAddModal() {
        setEditingId(null);
        setName("");
        setMuscleGroup("");
        setEquipment("");
        setDescription("");
        setShowModal(true);
    }

    function openEditModal(exercise) {
        setEditingId(exercise.id);
        setName(exercise.name || "");
        setMuscleGroup(exercise.muscle_group || "");
        setEquipment(exercise.equipment || "");
        setDescription(exercise.description || "");
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

        const exerciseData = {
            name: name,
            muscle_group: muscleGroup,
            equipment: equipment,
            description: description,
        };

        if (editingId) {
            fetch(`http://localhost:3000/exercises/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exerciseData),
            })
                .then((res) => res.json())
                .then((updatedExercise) => {
                    const updatedExercises = exercises.map((exercise) =>
                        exercise.id === editingId ? updatedExercise : exercise
                    );

                    setExercises(updatedExercises);
                    resetForm();
                })
                .catch((error) => {
                    console.error("Error updating exercise:", error);
                });
        } else {
            fetch("http://localhost:3000/exercises", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exerciseData),
            })
                .then((res) => res.json())
                .then((data) => {
                    setExercises([...exercises, data]);
                    resetForm();
                })
                .catch((error) => {
                    console.error("Error creating exercise:", error);
                });
        }
    }

    function handleDelete(id) {
        fetch(`http://localhost:3000/exercises/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const filteredExercises = exercises.filter((exercise) => exercise.id !== id);
                setExercises(filteredExercises);

                if (editingId === id) {
                    resetForm();
                }
            })
            .catch((error) => {
                console.error("Error deleting exercise:", error);
            });
    }

    function handleFilter() {
        let url = "http://localhost:3000/exercises?";
        const params = [];

        if (muscleGroupFilter) {
            params.push(`muscle_group=${encodeURIComponent(muscleGroupFilter)}`);
        }

        if (equipmentFilter) {
            params.push(`equipment=${encodeURIComponent(equipmentFilter)}`);
        }

        url += params.join("&");
        fetchExercises(url);
    }

    function handleClearFilters() {
        setMuscleGroupFilter("");
        setEquipmentFilter("");
        fetchExercises();
    }

    if (loading) {
        return <p>Loading exercises...</p>;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-3xl font-bold">Exercises</h2>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
                >
                    Add Exercise
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
                <h3 className="text-xl font-bold">Filter Exercises</h3>

                <input
                    type="text"
                    placeholder="Filter by muscle group"
                    value={muscleGroupFilter}
                    onChange={(e) => setMuscleGroupFilter(e.target.value)}
                    className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                />

                <input
                    type="text"
                    placeholder="Filter by equipment"
                    value={equipmentFilter}
                    onChange={(e) => setEquipmentFilter(e.target.value)}
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

            {exercises.length === 0 ? (
                <p className="bg-white p-6 rounded-xl shadow text-slate-600">
                    No exercises found.
                </p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {exercises.map((exercise) => (
                        <div key={exercise.id} className="bg-white p-5 rounded-xl shadow">
                            <h3 className="text-xl font-bold">{exercise.name}</h3>
                            <p className="mt-2">Muscle Group: {exercise.muscle_group}</p>
                            <p>Equipment: {exercise.equipment}</p>
                            <p>Description: {exercise.description}</p>

                            <div className="mt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => openEditModal(exercise)}
                                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(exercise.id)}
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
                                {editingId ? "Edit Exercise" : "Add Exercise"}
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
                                placeholder="Exercise name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                            />

                            <input
                                type="text"
                                placeholder="Muscle group"
                                value={muscleGroup}
                                onChange={(e) => setMuscleGroup(e.target.value)}
                                className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                            />

                            <input
                                type="text"
                                placeholder="Equipment"
                                value={equipment}
                                onChange={(e) => setEquipment(e.target.value)}
                                className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                            />

                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-slate-300 p-2 rounded-lg bg-white"
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
                                >
                                    {editingId ? "Update Exercise" : "Add Exercise"}
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

export default ExercisesPage;