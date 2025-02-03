// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Next.js Serverless Demo Overview
        </h1>
        <p className="text-lg text-gray-700">
          Explore the following examples to see serverless features in action:
        </p>
      </header>

      <main className="grid gap-6 max-w-2xl mx-auto">
        <Link href="/dashboard" className="block p-6 border rounded hover:bg-gray-100 transition">

          <h2 className="text-2xl font-semibold mb-2">Live SSE Dashboard</h2>
          <p className="text-gray-600">
            View real-time updates from a serverless API using Server-Sent Events.
          </p>

        </Link>

        <Link href="/login" className="block p-6 border rounded hover:bg-gray-100 transition">

          <h2 className="text-2xl font-semibold mb-2">JWT Login Form</h2>
          <p className="text-gray-600">
            Demonstrate JWT authentication with a simple login form.
          </p>

        </Link>

        <Link href="/image-generation" className="block p-6 border rounded hover:bg-gray-100 transition">

          <h2 className="text-2xl font-semibold mb-2">Image Generation (Optional)</h2>
          <p className="text-gray-600">
            (Optional) A demo for generating images via a serverless API.
          </p>

        </Link>
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Demo by Your Name • Powered by Next.js & Vercel
      </footer>
    </div>
  );
}
