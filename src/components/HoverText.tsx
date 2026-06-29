"use client";

import { useRef, useEffect, useState, useId } from "react";
import { motion } from "motion/react";

const fillHover = "#1e699c33";

const LAYOUTS = {
  desktop: {
    text: "TeLoResuelvo",
    viewW: 800,
    viewH: 220,
    textY: 110,
    fontSize: 98,
    strokeWidth: 0.5,
    maskRadius: "22%",
    strokeDefault: "rgba(255, 255, 255, 0.15)",
  },
  mobile: {
    text: "TLR",
    viewW: 360,
    viewH: 200,
    textY: 108,
    fontSize: 158,
    strokeWidth: 0.85,
    maskRadius: "42%",
    strokeDefault: "rgba(255, 255, 255, 0.28)",
  },
} as const;

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export default function HoverText() {
  const isMobile = useIsMobile();
  const layout = isMobile ? LAYOUTS.mobile : LAYOUTS.desktop;
  const uid = useId().replace(/:/g, "");

  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const textX = layout.viewW / 2;
  const sharedTextProps = {
    x: textX,
    y: layout.textY,
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontSize: layout.fontSize,
    fontWeight: 700,
    fontFamily: "Helvetica, Arial, sans-serif",
    strokeWidth: layout.strokeWidth,
  };

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox={`0 0 ${layout.viewW} ${layout.viewH}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) setCursor({ x: touch.clientX, y: touch.clientY });
      }}
      className={`footer-hover-text__svg select-none${isMobile ? " footer-hover-text__svg--mobile" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`textGradient-${uid}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#5ec8f0" />
        </linearGradient>

        <motion.radialGradient
          id={`revealMask-${uid}`}
          gradientUnits="userSpaceOnUse"
          r={hovered ? layout.maskRadius : "0%"}
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`textMask-${uid}`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#revealMask-${uid})`} />
        </mask>
      </defs>
      <motion.text
        {...sharedTextProps}
        style={{ fill: "transparent", stroke: layout.strokeDefault }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {layout.text}
      </motion.text>
      <text
        {...sharedTextProps}
        stroke={`url(#textGradient-${uid})`}
        style={{ fill: fillHover }}
        mask={`url(#textMask-${uid})`}
      >
        {layout.text}
      </text>
    </svg>
  );
}
