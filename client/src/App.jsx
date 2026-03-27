import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkoutsPage from "./pages/WorkoutsPage";
import ExercisesPage from "./pages/ExercisesPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gray-900 text-white p-4">
                <div className="max-w-5xl mx-auto flex gap-6">
                    <Link to="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/workouts" className="hover:text-gray-300">
                        Workouts
                    </Link>
                    <Link to="/exercises" className="hover:text-gray-300">
                        Exercises
                    </Link>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto p-8">
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