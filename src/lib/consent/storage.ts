import type { CookieConsent, ConsentState } from "./types";

const CONSENT_COOKIE = "tlr_cookie_consent";

function getExpiryDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toUTCString();
}

export function readConsent(expiryDays: number): ConsentState {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));

  if (!match) return null;

  try {
    const value = decodeURIComponent(match.split("=")[1] ?? "");
    const parsed = JSON.parse(value) as CookieConsent;

    if (parsed.necessary !== true || typeof parsed.timestamp !== "number") {
      return null;
    }

    const maxAge = expiryDays * 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.timestamp > maxAge) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(consent: CookieConsent, expiryDays: number): void {
  const value = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; expires=${getExpiryDate(expiryDays)}; SameSite=Lax`;
}

export function clearConsent(): void {
  document.cookie = `${CONSENT_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function createConsent(
  analytics: boolean,
  marketing: boolean
): CookieConsent {
  return {
    necessary: true,
    analytics,
    marketing,
    timestamp: Date.now(),
  };
}
