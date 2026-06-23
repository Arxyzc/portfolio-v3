import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0b",
          color: "#fafafa",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 4, color: "#9d7cf9" }}>
          (01) ANDRE TIBURCIO
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 64,
            lineHeight: 1.15,
            letterSpacing: -2,
          }}
        >
          Full-Stack Developer
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#8a8a8f" }}>
          Interfaces, APIs y la infraestructura que las sostiene.
        </div>
      </div>
    ),
    size
  );
}
