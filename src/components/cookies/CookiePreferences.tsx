"use client";

import { useEffect, useState } from "react";
import { cookieConsentConfig } from "@/config/cookie-consent.config";
import { useCookieConsent } from "./CookieConsent";

const { texts } = cookieConsentConfig;

export default function CookiePreferences() {
  const { consent, savePreferences, closePreferences } = useCookieConsent();
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  useEffect(() => {
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
  }, [consent]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closePreferences]);

  return (
    <div className="cookie-consent-overlay" role="presentation">
      <div
        className="cookie-consent-preferences"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
      >
        <h2 id="cookie-prefs-title" className="cookie-consent-preferences__title font-display">
          {texts.preferencesTitle}
        </h2>
        <p className="cookie-consent-preferences__description">
          {texts.preferencesDescription}
        </p>

        <div className="cookie-consent-preferences__list">
          <div className="cookie-consent-pref cookie-consent-pref--locked">
            <div className="cookie-consent-pref__info">
              <p className="cookie-consent-pref__label">{texts.necessaryLabel}</p>
              <p className="cookie-consent-pref__desc">{texts.necessaryDescription}</p>
            </div>
            <span className="cookie-consent-pref__always">Siempre activas</span>
          </div>

          <label className="cookie-consent-pref">
            <div className="cookie-consent-pref__info">
              <p className="cookie-consent-pref__label">{texts.analyticsLabel}</p>
              <p className="cookie-consent-pref__desc">{texts.analyticsDescription}</p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="cookie-consent-pref__toggle"
            />
          </label>

          <label className="cookie-consent-pref">
            <div className="cookie-consent-pref__info">
              <p className="cookie-consent-pref__label">{texts.marketingLabel}</p>
              <p className="cookie-consent-pref__desc">{texts.marketingDescription}</p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="cookie-consent-pref__toggle"
            />
          </label>
        </div>

        <div className="cookie-consent-preferences__actions">
          <button
            type="button"
            onClick={() => savePreferences(analytics, marketing)}
            className="cookie-consent-banner__accept-btn"
          >
            {texts.savePreferences}
          </button>
          <button
            type="button"
            onClick={closePreferences}
            className="cookie-consent-banner__manage-btn"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
