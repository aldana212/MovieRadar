// src/features/auth/ProtectedRoute.tsx
import { useAuthStore } from "@/features/auth/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();  

  if (loading) {
    return <div className="p-4">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />
};
