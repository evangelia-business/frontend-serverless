// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { error: "Username required" }, 
        { status: 400 }
      );
    }

    // Create a token
    const token = jwt.sign({ username }, "yoursecretkey", { expiresIn: "1h" });

    // Create a response with the token
    const response = NextResponse.json(
      { 
        token, 
        message: "Login successful" 
      },
      { status: 200 }
    );

    // Set the token as a cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 3600 // 1 hour
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';