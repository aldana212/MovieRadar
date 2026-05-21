import { Routes, Route } from "react-router-dom";
import AuthPage from "@/features/auth/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import MoviePage from "@/features/movies/pages/MoviePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
