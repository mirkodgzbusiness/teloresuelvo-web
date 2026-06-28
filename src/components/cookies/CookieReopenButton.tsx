"use client";

import { cookieConsentConfig } from "@/config/cookie-consent.config";
import { useCookieConsent } from "./CookieConsent";

export default function CookieReopenButton() {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="cookie-consent-reopen"
      aria-label={cookieConsentConfig.texts.managePreferences}
    >
      {cookieConsentConfig.texts.reopenLabel}
    </button>
  );
}
