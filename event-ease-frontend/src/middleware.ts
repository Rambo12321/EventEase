import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET!;

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  try {
    jwtVerify(token, new TextEncoder().encode(SECRET_KEY));

    return NextResponse.next();
  } catch (error: unknown) {
    console.log("Encountered Error -> ", error);

    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }
};

export const config = {
  matcher: ["/signup"],
};
