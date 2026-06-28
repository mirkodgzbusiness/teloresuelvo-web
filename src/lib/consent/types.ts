export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export type ConsentState = CookieConsent | null;
