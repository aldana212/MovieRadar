import CustomButton from "@/components/ui/CustomButton/CustomButton";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { authApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

type Mode = "login" | "register";

const Card = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      setSubmitting(true);
      if (submitting) return; // 🔒 clave

      if (mode === "register") {
        await authApi.register(email, password);
        setSuccess("Te enviamos un correo para confirmar tu cuenta 📩");
        setTimeout(() => {
          toggleMode();
        }, 2000);
      } else {
        await authApi.login(email, password);
        navigate("/");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      const message = error instanceof Error ? error.message : "Unknown error";

      setError(
        message.includes("Invalid login")
          ? "Invalid email or password."
          : message,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setSuccess("");
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 shadow-2xl shadow-black/40">
      <h2 className="text-xl font-semibold text-white mb-1">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        {mode === "login"
          ? "Sign in to access your favorite movies"
          : "Start saving your favorite movies today"}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="min-w-4 h-4 text-gray-500" />}
          required
        />

        <CustomInput
          label="Password"
          type="password"
          placeholder="Min. 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="min-w-4 h-4 text-gray-500" />}
          required
          minLength={6}
        />

        <CustomButton
          type="submit"
          loading={submitting}
          disabled={submitting}
          label={mode === "login" ? "Sign In" : "Create Account"}
          className="w-full"
        />
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            onClick={toggleMode}
            className="ml-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Card;
