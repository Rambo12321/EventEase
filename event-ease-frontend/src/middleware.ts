import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  try {
    jwt.verify(token, SECRET_KEY);

    NextResponse.redirect(new URL("login", req.url));
  } catch (error: unknown) {
    console.log("Encountered Error -> ", error);

    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }
};

export const config = {
  matcher: ["/dashboard"],
};
