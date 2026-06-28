"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

/* Proportions tuned so "TeLoResuelvo" fits without stretching glyphs */
const VIEW_W = 800;
const VIEW_H = 220;
const TEXT_X = VIEW_W / 2;
const TEXT_Y = 110;
const FONT_SIZE = 98;

const sharedTextProps = {
  x: TEXT_X,
  y: TEXT_Y,
  textAnchor: "middle" as const,
  dominantBaseline: "middle" as const,
  fontSize: FONT_SIZE,
  fontWeight: 700,
  fontFamily: "Helvetica, Arial, sans-serif",
  strokeWidth: 0.5,
};

export default function HoverText({ text }: { text: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

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
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="footer-hover-text__svg select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#008dcc" />
              <stop offset="50%" stopColor="#3186ff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        {...sharedTextProps}
        style={{
          opacity: hovered ? 0.7 : 0,
          fill: "transparent",
          stroke: "rgba(255, 255, 255, 0.15)",
        }}
      >
        {text}
      </text>
      <motion.text
        {...sharedTextProps}
        style={{
          fill: "transparent",
          stroke: "rgba(255, 255, 255, 0.15)",
        }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        {...sharedTextProps}
        stroke="url(#textGradient)"
        style={{ fill: "transparent" }}
        mask="url(#textMask)"
      >
        {text}
      </text>
    </svg>
  );
}
