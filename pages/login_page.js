import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { FaSignInAlt } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirection vers /garage_page si déjà connecté
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/myVehicles_page");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/myVehicles_page"); // Redirige après une connexion réussie
    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError("Email ou mot de passe invalide.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-900">
      <div className="w-full max-w-md p-8 shadow-2xl bg-white/90 backdrop-blur-md rounded-3xl">
        <div className="flex justify-center mb-6 -mt-20">
          <div className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-gradient-to-tr from-purple-600 to-pink-500 ring-4 ring-white animate-pulse">
            <span className="text-3xl font-bold text-white">👤</span>
          </div>
        </div>
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-center text-gray-800">
          Welcome
        </h1>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 transition border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 transition border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-full gap-2 button-main"
        >
          <FaSignInAlt /> Sign in
        </button>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/signup_page")}
            className="font-semibold text-purple-600 transition hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
