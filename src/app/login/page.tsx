"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Store token in localStorage (optional, since we're using cookies)
        localStorage.setItem("token", data.token);
        
        // Navigate to auth page
        router.push("/auth");
      } else {
        // Handle error responses
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}