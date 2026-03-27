import { useEffect, useState } from "react";

function ExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [equipment, setEquipment] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/exercises")
            .then((res) => res.json())
            .then((data) => {
                setExercises(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching exercises:", error);
                setLoading(false);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        const newExercise = {
            name: name,
            muscle_group: muscleGroup,
            equipment: equipment,
            description: description,
        };

        fetch("http://localhost:3000/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newExercise),
        })
            .then((res) => res.json())
            .then((data) => {
                setExercises([...exercises, data]);
                setName("");
                setMuscleGroup("");
                setEquipment("");
                setDescription("");
            })
            .catch((error) => {
                console.error("Error creating exercise:", error);
            });
    }

    function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this exercise?");
        if (confirmed) {
            return;
        }
        fetch(`http://localhost:3000/exercises/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const filteredExercises = exercises.filter((exercise) => exercise.id !== id);
                setExercises(filteredExercises);
            })
            .catch((error) => {
                console.error("Error deleting exercise:", error);
            });
    }

    if (loading) {
        return <p>Loading exercises...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Exercises</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
            >
                <h3 className="text-xl font-bold">Add an Exercise</h3>

                <input
                    type="text"
                    placeholder="Exercise name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Muscle group"
                    value={muscleGroup}
                    onChange={(e) => setMuscleGroup(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Equipment"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Add Exercise
                </button>
            </form>

            {exercises.length === 0 ? (
                <p>No exercises found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {exercises.map((exercise) => (
                        <div key={exercise.id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-xl font-bold">{exercise.name}</h3>
                            <p className="mt-2">Muscle Group: {exercise.muscle_group}</p>
                            <p>Equipment: {exercise.equipment}</p>
                            <p>Description: {exercise.description}</p>

                            <button
                                onClick={() => handleDelete(exercise.id)}
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

export default ExercisesPage;