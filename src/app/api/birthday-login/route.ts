import { NextResponse } from "next/server";
import {
  createBirthdaySessionToken,
  getBirthdayAuthCookieConfig,
  verifyBirthdayCredentials,
} from "@/lib/birthday-auth";

function normalizeNextPath(nextPath: string | null): string {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/create/birthday";
  }
  return nextPath;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = normalizeNextPath(formData.get("next") as string | null);

  if (!verifyBirthdayCredentials(username, password)) {
    const redirectUrl = new URL(`/birthday-login?error=1&next=${encodeURIComponent(nextPath)}`, request.url);
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  const token = createBirthdaySessionToken(username.trim());
  if (!token) {
    const redirectUrl = new URL(`/birthday-login?error=1&next=${encodeURIComponent(nextPath)}`, request.url);
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  const redirectUrl = new URL(nextPath, request.url);
  const response = NextResponse.redirect(redirectUrl, { status: 303 });
  response.cookies.set(getBirthdayAuthCookieConfig(token));
  return response;
}

