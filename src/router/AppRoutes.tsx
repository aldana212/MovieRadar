import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";
import TrendingPage from "@/pages/TrendingPage";
import PopularPage from "@/pages/PopularPage";
import GenrePage from "@/pages/GenrePage";
import FavoritesPage from "@/pages/FavoritesPage";
import MovieDetailPage from "@/pages/MovieDetailPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/trending" replace />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
