import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkoutsPage from "./pages/WorkoutsPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";
import ExercisesPage from "./pages/ExercisesPage";

function App() {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <nav className="bg-slate-900 text-white shadow-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Workout Planner</h1>

                    <div className="flex gap-6 text-sm sm:text-base">
                        <Link to="/" className="hover:text-slate-300">
                            Home
                        </Link>
                        <Link to="/workouts" className="hover:text-slate-300">
                            Workouts
                        </Link>
                        <Link to="/exercises" className="hover:text-slate-300">
                            Exercises
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/workouts/:id" element={<WorkoutDetailsPage />} />
                    <Route path="/exercises" element={<ExercisesPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;