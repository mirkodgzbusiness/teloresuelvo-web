"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cookieConsentConfig } from "@/config/cookie-consent.config";
import {
  createConsent,
  readConsent,
  writeConsent,
} from "@/lib/consent/storage";
import type { ConsentState, CookieConsent } from "@/lib/consent/types";
import CookieBanner from "./CookieBanner";
import CookiePreferences from "./CookiePreferences";
import CookieReopenButton from "./CookieReopenButton";

interface ConsentContextValue {
  consent: ConsentState;
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  savePreferences: (analytics: boolean, marketing: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsent");
  }
  return ctx;
}

function applyConsent(consent: CookieConsent) {
  writeConsent(consent, cookieConsentConfig.expiryDays);
  window.dispatchEvent(
    new CustomEvent("cookie-consent-update", { detail: consent })
  );
}

export default function CookieConsent({ children }: { children?: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readConsent(cookieConsentConfig.expiryDays);
    setConsent(stored);
    setReady(true);

    if (stored === null) {
      const delay = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(delay);
    }
  }, []);

  const persist = useCallback((next: CookieConsent) => {
    applyConsent(next);
    setConsent(next);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist(createConsent(true, true));
  }, [persist]);

  const acceptNecessaryOnly = useCallback(() => {
    persist(createConsent(false, false));
  }, [persist]);

  const savePreferences = useCallback(
    (analytics: boolean, marketing: boolean) => {
      persist(createConsent(analytics, marketing));
    },
    [persist]
  );

  const openPreferences = useCallback(() => {
    setShowPreferences(true);
    setShowBanner(false);
  }, []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
    if (!consent) setShowBanner(true);
  }, [consent]);

  if (!ready) return <>{children}</>;

  return (
    <ConsentContext.Provider
      value={{
        consent,
        showBanner,
        showPreferences,
        acceptAll,
        acceptNecessaryOnly,
        savePreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
      {showBanner && <CookieBanner />}
      {showPreferences && <CookiePreferences />}
    </ConsentContext.Provider>
  );
}
