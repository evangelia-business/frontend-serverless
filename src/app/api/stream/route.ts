// app/api/stream/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  let cancelled = false;
  
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      
      // Recursive function to send events
      const sendEvent = () => {
        if (cancelled) return; // Don't proceed if canceled

        const data = {
          message: "New serverless event: " + new Date().toLocaleTimeString(),
        };
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch (error) {
          // Optionally log the error
          console.error("Error enqueuing event:", error);
          return; // Stop further attempts if error occurs
        }

        // Schedule the next event after 3 seconds
        setTimeout(sendEvent, 3000);
      };

      // Kick off the first event
      sendEvent();

      // Cleanup function: set cancellation flag so no more events are sent
      return () => {
        cancelled = true;
      };
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
