"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardAuth() {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("/api/verify", {
          method: "POST",
          credentials: 'include', // Important for sending cookies
        });

        const data = await response.json();

        if (response.ok) {
          setUsername(data.username);
        } else {
          // Invalid token, redirect to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Token verification failed", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Demo Auth Page</h1>
      {username ? (
        <p className="text-lg mb-4">Hello, <strong>{username}</strong>! You are logged in.</p>
      ) : (
        <p className="text-lg mb-4">Checking authentication...</p>
      )}
      <button
        onClick={() => {
          // Clear token and redirect to login
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          router.push("/login");
        }}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}