"use client";

import { useEffect, useRef } from "react";

const DAYS = [
  { key: "monday", label: "Lunes", open: "10:00", close: "19:00" },
  { key: "tuesday", label: "Martes", open: "10:00", close: "19:00" },
  { key: "wednesday", label: "Miércoles", open: "10:00", close: "19:00" },
  { key: "thursday", label: "Jueves", open: "10:00", close: "19:00" },
  { key: "friday", label: "Viernes", open: "10:00", close: "19:00" },
  { key: "saturday", label: "Sábado", open: "10:00", close: "18:00" },
  { key: "sunday", label: "Domingo", open: "", close: "" },
];

export default function OpeningHours() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const defaultTimezone = "Europe/Rome";

    const timeToMinutes = (str: string) => {
      const m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(str || "");
      return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : null;
    };

    const getNowParts = () => {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: defaultTimezone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const parts = fmt.formatToParts(new Date());
      const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
      const weekdayIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(map.weekday);
      return { weekdayIdx, hour: parseInt(map.hour, 10), minute: parseInt(map.minute, 10) };
    };

    const dayIndex: Record<string, number> = {
      monday: 0, tuesday: 1, wednesday: 2, thursday: 3,
      friday: 4, saturday: 5, sunday: 6,
    };

    const rows = Array.from(root.querySelectorAll("[data-opening-hours-day]")) as HTMLElement[];
    const ordered = new Array<HTMLElement>(7);
    rows.forEach((r) => {
      const d = (r.getAttribute("data-opening-hours-day") || "").trim().toLowerCase();
      if (d in dayIndex) ordered[dayIndex[d]] = r;
    });
    if (ordered.some((r) => !r)) return;

    const schedule = ordered.map((row) => {
      const o = (row.getAttribute("data-opening-hours-open") || "").trim();
      const c = (row.getAttribute("data-opening-hours-close") || "").trim();
      const openMin = timeToMinutes(o);
      const closeMin = timeToMinutes(c);
      if (openMin == null || closeMin == null)
        return { open: false, openMin: 0, closeMin: 0, overnight: false };
      const overnight = openMin > closeMin;
      return { open: true, openMin, closeMin, overnight };
    });

    const evaluate = () => {
      const now = getNowParts();
      const curIdx = now.weekdayIdx;
      const nowMin = now.hour * 60 + now.minute;

      ordered.forEach((r) => r.removeAttribute("data-opening-hours-current-day"));
      ordered[curIdx].setAttribute("data-opening-hours-current-day", "");

      const today = schedule[curIdx];
      const yesterday = schedule[(curIdx + 6) % 7];

      let isOpen = false;
      if (today.open) {
        if (!today.overnight) {
          isOpen = nowMin >= today.openMin && nowMin < today.closeMin;
        } else {
          isOpen = nowMin >= today.openMin || nowMin < today.closeMin;
        }
      }
      if (!isOpen && yesterday.open && yesterday.overnight && nowMin < yesterday.closeMin) {
        isOpen = true;
      }

      root.setAttribute("data-opening-hours-store-status", isOpen ? "open" : "closed");
    };

    evaluate();
    const timer = setInterval(evaluate, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={rootRef}
      data-opening-hours-init
      data-opening-hours-timezone="Europe/Rome"
      className="opening-hours"
    >
      <div className="opening-hours__top">
        <h2 className="opening-hours__title">Horario</h2>
        <div className="opening-hours__status">
          <div className="opening-hours__status-bg" />
          <div className="opening-hours__status-dot" />
          <p className="opening-hours__p is--closed">Cerrado</p>
          <p className="opening-hours__p is--open">Abierto</p>
        </div>
      </div>
      <div className="opening-hours__timetable">
        {DAYS.map((day) => (
          <div
            key={day.key}
            data-opening-hours-day={day.key}
            {...(day.open ? { "data-opening-hours-open": day.open, "data-opening-hours-close": day.close } : {})}
            className="opening-hours__row"
          >
            <div className="opening-hours__day">
              <p className="opening-hours__p">{day.label}</p>
            </div>
            <div className="opening-hours__time">
              <p className="opening-hours__p">
                {day.open ? `${day.open}–${day.close}` : "Cerrado"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
