import { NextResponse } from "next/server";
import { getBirthdayLogoutCookieConfig } from "@/lib/birthday-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/birthday-login", request.url), { status: 303 });
  response.cookies.set(getBirthdayLogoutCookieConfig());
  return response;
}

export async function GET(request: Request) {
  return POST(request);
}

