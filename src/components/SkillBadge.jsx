import { useRef } from "react";
import { C } from "../constants";

export function SkillBadge({ name, level, delay }) {
  const ref = useRef();
  return (
    <div
      ref={ref}
      className="skill-badge"
      style={{
        padding: "20px 32px",
        border: `1px solid #ffffff08`,
        borderRadius: "12px",
        background: C.surface,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "24px",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.neon;
        e.currentTarget.style.transform = "translateX(8px)";
        e.currentTarget.style.boxShadow = `0 4px 20px ${C.neon}10`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ffffff08";
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "13px", fontWeight: "bold", letterSpacing: "0.05em",
        color: C.text, textTransform: "uppercase",
      }}>{name}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "100px", height: "4px", background: "#ffffff10", borderRadius: "4px" }}>
          <div style={{
            height: "100%", width: `${level}%`,
            background: C.neon,
            borderRadius: "4px",
            transition: "width 1s ease",
          }} />
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: C.neon }}>{level}%</span>
      </div>
    </div>
  );
}
