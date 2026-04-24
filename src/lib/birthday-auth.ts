import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "birthday_auth";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getEnvValue(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function getAuthConfig() {
  const username = getEnvValue("BIRTHDAY_LOGIN_USERNAME");
  const password = getEnvValue("BIRTHDAY_LOGIN_PASSWORD");
  const secret = getEnvValue("BIRTHDAY_LOGIN_SECRET");
  return { username, password, secret };
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function encodeSession(username: string, expiresAt: number, secret: string): string {
  const payloadObj = { u: username, exp: expiresAt };
  const payload = Buffer.from(JSON.stringify(payloadObj), "utf8").toString("base64url");
  const signature = signPayload(payload, secret);
  return `${payload}.${signature}`;
}

function decodeSession(token: string, secret: string): { u: string; exp: number } | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = signPayload(payload, secret);
  const sigBuf = Buffer.from(signature, "utf8");
  const expectedBuf = Buffer.from(expectedSignature, "utf8");
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      u?: unknown;
      exp?: unknown;
    };

    if (typeof parsed.u !== "string" || typeof parsed.exp !== "number") return null;
    return { u: parsed.u, exp: parsed.exp };
  } catch {
    return null;
  }
}

export function verifyBirthdayCredentials(inputUsername: string, inputPassword: string): boolean {
  const { username, password, secret } = getAuthConfig();
  if (!username || !password || !secret) return false;

  return safeCompare(inputUsername.trim(), username) && safeCompare(inputPassword, password);
}

export function createBirthdaySessionToken(username: string): string | null {
  const { secret } = getAuthConfig();
  if (!secret) return null;
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  return encodeSession(username, expiresAt, secret);
}

export async function isBirthdayAuthenticated(): Promise<boolean> {
  const { username, secret } = getAuthConfig();
  if (!username || !secret) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const payload = decodeSession(token, secret);
  if (!payload) return false;
  if (payload.exp < Math.floor(Date.now() / 1000)) return false;

  return safeCompare(payload.u, username);
}

export function getBirthdayAuthCookieConfig(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function getBirthdayLogoutCookieConfig() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

