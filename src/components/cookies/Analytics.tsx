"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { cookieConsentConfig } from "@/config/cookie-consent.config";
import { readConsent } from "@/lib/consent/storage";
import type { CookieConsent } from "@/lib/consent/types";

function hasAnalyticsConsent(consent: CookieConsent | null): boolean {
  return consent?.analytics === true;
}

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);
  const gaId = cookieConsentConfig.gaMeasurementId;

  useEffect(() => {
    const sync = () => {
      const consent = readConsent(cookieConsentConfig.expiryDays);
      setEnabled(hasAnalyticsConsent(consent));
    };

    sync();
    window.addEventListener("cookie-consent-update", sync);
    return () => window.removeEventListener("cookie-consent-update", sync);
  }, []);

  if (!gaId || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
