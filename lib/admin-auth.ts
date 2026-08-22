import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "nexa-admin-session";

function getSessionSecret() {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD;

  if (!secret) {
    throw new Error(
      "Falta ADMIN_SESSION_SECRET o ADMIN_PASSWORD"
    );
  }

  return secret;
}

export function createAdminSession() {
  const secret = getSessionSecret();

  return createHmac("sha256", secret)
    .update("nexa-admin-authenticated")
    .digest("hex");
}

export function isAdminSessionValid(
  value: string | undefined
) {
  if (!value) {
    return false;
  }

  const expected =
    createAdminSession();

  try {
    return timingSafeEqual(
      Buffer.from(value),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

export { COOKIE_NAME };