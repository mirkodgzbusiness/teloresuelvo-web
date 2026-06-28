"use client";

import Image from "next/image";
import Link from "next/link";
import { cookieConsentConfig } from "@/config/cookie-consent.config";
import { useCookieConsent } from "./CookieConsent";

const { texts, logoSrc, logoAlt, siteName, cookiePolicyUrl } =
  cookieConsentConfig;

export default function CookieBanner() {
  const { acceptAll, acceptNecessaryOnly, openPreferences } = useCookieConsent();

  return (
    <div className="cookie-consent-overlay" role="presentation">
      <div
        className="cookie-consent-banner"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
      >
        <div className="cookie-consent-banner__header">
          <div className="cookie-consent-banner__brand">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={40}
              height={40}
              className="cookie-consent-banner__logo"
            />
            <span className="cookie-consent-banner__site font-display">
              {siteName}
            </span>
          </div>
          <button
            type="button"
            onClick={acceptNecessaryOnly}
            className="cookie-consent-banner__necessary-btn"
          >
            {texts.necessaryOnly}
          </button>
        </div>

        <h2 id="cookie-banner-title" className="cookie-consent-banner__title font-display">
          {texts.bannerTitle}
        </h2>

        <p className="cookie-consent-banner__description">
          {texts.bannerDescription}{" "}
          <Link href={cookiePolicyUrl} className="cookie-consent-banner__link">
            {texts.cookiePolicyLink}
          </Link>
          .
        </p>

        <button
          type="button"
          onClick={acceptAll}
          className="cookie-consent-banner__accept-btn"
        >
          {texts.acceptAll}
        </button>

        <button
          type="button"
          onClick={openPreferences}
          className="cookie-consent-banner__manage-btn"
        >
          {texts.managePreferences}
        </button>
      </div>
    </div>
  );
}
