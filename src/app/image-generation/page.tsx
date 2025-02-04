// app/image-generation/page.tsx
"use client";

import { useState } from "react";

export default function ImageGeneration() {
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async () => {
    // For demo purposes, this simulates an API call.
    // Replace with your actual image generation API logic.
    const res = await fetch("/api/image-generation");
    const data = await res.json();
    setImageUrl(data.url);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Image Generation Demo</h1>
      <button
        onClick={handleGenerate}
        className="p-2 bg-green-600 text-white rounded mb-4"
      >
        Generate Image
      </button>
      {imageUrl && (
        <img src={imageUrl} alt="Generated" className="border rounded shadow" />
      )}
    </div>
  );
}
