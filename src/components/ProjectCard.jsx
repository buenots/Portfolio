import { useRef, useState } from "react";
import { C } from "../constants";

export function ProjectCard({ title, tags, desc, index }) {
  const cardRef = useRef();
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    setHovered(false);
  };

  return (
    <div
      className={`project-card-${index}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: C.surface,
        border: `1px solid ${hovered ? C.neon : "#ffffff08"}`,
        borderRadius: "16px",
        padding: "40px",
        cursor: "pointer",
        transition: "transform 0.2s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hovered ? `0 10px 40px ${C.neon}10` : "0 4px 20px #00000040",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        width: hovered ? "60px" : "36px", height: "4px",
        background: C.neon, marginBottom: "32px",
        transition: "width 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }} />

      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(24px, 3vw, 32px)",
        color: C.text, marginBottom: "16px", letterSpacing: "0.05em",
      }}>{title}</h3>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "15px", color: C.muted, lineHeight: "1.6", marginBottom: "32px",
      }}>{desc}</p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
        {tags.map((t) => (
          <span key={t} style={{
            padding: "6px 16px",
            border: `1px solid ${C.neon}30`,
            borderRadius: "20px",
            color: C.neon,
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px", letterSpacing: "0.1em",
            background: hovered ? `${C.neon}10` : "transparent",
            transition: "background 0.3s ease"
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
