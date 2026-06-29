"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2100);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="loading-screen"
      style={{ opacity: fadeOut ? 0 : 1 }}
    >
      <div className="loading-screen__logo">
        <Image
          src="/LogoTeLoResuelvoPNG (1).webp"
          alt="Te Lo Resuelvo Viajes"
          width={120}
          height={120}
          priority
          loading="eager"
          className="loading-screen__img"
        />
      </div>
    </div>
  );
}
