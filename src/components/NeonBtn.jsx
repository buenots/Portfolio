import { C } from "../constants";

export function NeonBtn({ children, href, onClick, outline }) {
  return (
    <a
      href={href || "#"}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "16px 40px",
        borderRadius: "40px", // Pill shape
        border: `1px solid ${outline ? "#ffffff40" : C.neon}`,
        background: outline ? "transparent" : C.neon,
        color: outline ? C.text : C.bg,
        fontFamily: "'Space Mono', monospace",
        fontSize: "14px",
        fontWeight: "bold",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = outline ? C.neon : "#e0ff33";
        e.currentTarget.style.color = C.bg;
        e.currentTarget.style.borderColor = C.neon;
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = outline ? "transparent" : C.neon;
        e.currentTarget.style.color = outline ? C.text : C.bg;
        e.currentTarget.style.borderColor = outline ? "#ffffff40" : C.neon;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </a>
  );
}
