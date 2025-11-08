import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET!;

const PUBLIC_PATHS = ["/login", "/", "/signup", "/events/global"];

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
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
  matcher: ["/profile", "/events", "/events/global"],
};
