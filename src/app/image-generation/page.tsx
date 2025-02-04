"use client";

import { useState } from "react";

export default function ImageGenerationPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [text, setText] = useState<string>("Hello!");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/image-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, width: 300, height: 200 }),
      });
      const svgBlob = await response.blob();
      const url = URL.createObjectURL(svgBlob);
      setImageUrl(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Image Generation Demo</h1>
      <form id="imageForm" onSubmit={handleSubmit} className="mb-4">
        <input
          id="text"
          type="text"
          placeholder="Enter text for image"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Generate Image
        </button>
      </form>
      {imageUrl && (
        <div>
          <img
            id="generatedImage"
            src={imageUrl}
            alt="Generated"
            className="border rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
