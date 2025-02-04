// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  // Extract token from cookies
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" }, 
      { status: 401 }
    );
  }

  try {
    // Verify the token 
    const decoded = jwt.verify(token, "yoursecretkey") as { username: string };

    return NextResponse.json({ 
      username: decoded.username 
    }, { status: 200 });

  } catch (error) {
    console.error("Token verification error", error);
    return NextResponse.json(
      { message: 'Invalid token' }, 
      { status: 401 }
    );
  }
}

// Ensure dynamic routing
export const dynamic = 'force-dynamic';