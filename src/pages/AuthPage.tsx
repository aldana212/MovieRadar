import { Film } from "lucide-react";
import Card from "../features/auth/components/Card";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <Film className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            MovieRadar
          </h1>
        </div>

        {/* Card */}
        <Card />
      </div>
    </div>
  );
};

export default AuthPage;
