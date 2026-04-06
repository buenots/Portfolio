import { C } from "../constants";

export function NeonBtn({ children, href, onClick, outline }) {
  return (
    <a
      href={href || "#"}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "14px 32px",
        border: `1px solid ${outline ? C.neon : "transparent"}`,
        background: outline ? "transparent" : `linear-gradient(135deg, #00ffe740, #00ffe715)`,
        color: C.neon,
        fontFamily: "'Space Mono', monospace",
        fontSize: "13px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        borderRadius: "0px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${C.neon}22`;
        e.currentTarget.style.boxShadow = `0 0 20px ${C.neon}60, inset 0 0 20px ${C.neon}10`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = outline ? "transparent" : `linear-gradient(135deg, #00ffe740, #00ffe715)`;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}
