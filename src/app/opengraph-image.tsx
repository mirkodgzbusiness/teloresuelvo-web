import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Te Lo Resuelvo Viajes — Vuelos entre Sudamérica y Europa al mejor precio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo-og.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  const figtreeBold = await fetch(
    "https://fonts.gstatic.com/s/figtree/v9/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_eYR15e.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          background: "linear-gradient(135deg, #0f3a6d 0%, #38bdf8 100%)",
          fontFamily: "Figtree",
          color: "#fff",
        }}
      >
        <img
          src={logoBase64}
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "42px",
              fontWeight: 700,
              textTransform: "uppercase" as const,
            }}
          >
            Te Lo Resuelvo Viajes
          </span>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            Agenzia Viaggi a Milano — Voli tra Sud America ed Europa
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Figtree",
          data: figtreeBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
