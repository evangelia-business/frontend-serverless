// app/dashboard/page.tsx

"use client"

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.message]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-4">Live SSE Dashboard</h1>
      <p className="mb-6 text-gray-600">
        Real-time updates from a serverless API using Server-Sent Events.
      </p>
      <ul className="space-y-2">
        {messages.map((msg, index) => (
          <li key={index} className="p-2 border rounded">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
