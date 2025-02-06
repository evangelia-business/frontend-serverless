import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Extract parameters from the request body; use defaults if not provided
    const { text = "Hello!", width = 200, height = 200 } = await request.json();

    // Helper: Generate a random pastel background color
    const generatePastelColor = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 80%)`;
    };

    const bgColor = generatePastelColor();

    // Create an SVG image with a colored background and centered text
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#333">
          ${text}
        </text>
      </svg>
    `;

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error},
      { status: 500 }
    );
  }
}
