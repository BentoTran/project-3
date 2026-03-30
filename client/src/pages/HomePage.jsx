import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="space-y-8">
            <section className="bg-white rounded-xl shadow p-8">
                <h2 className="text-4xl font-bold mb-4">Welcome to Workout Planner</h2>
                <p className="text-lg text-slate-600 mb-6">
                    Build workouts, manage exercises, and organize your training plans in one place.
                </p>

                <div className="flex gap-4">
                    <Link
                        to="/workouts"
                        className="bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-700"
                    >
                        View Workouts
                    </Link>

                    <Link
                        to="/exercises"
                        className="bg-white border border-slate-300 px-5 py-3 rounded-lg hover:bg-slate-100"
                    >
                        View Exercises
                    </Link>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-3">
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-xl font-bold mb-2">Create Workouts</h3>
                    <p className="text-slate-600">
                        Build custom workouts with difficulty, duration, and focus area.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-xl font-bold mb-2">Manage Exercises</h3>
                    <p className="text-slate-600">
                        Add and organize exercises by muscle group, equipment, and description.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-xl font-bold mb-2">Plan Training</h3>
                    <p className="text-slate-600">
                        Add exercises to workouts and track sets and reps for each one.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default HomePage;