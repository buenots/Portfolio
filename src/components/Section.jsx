export function Section({ id, children, style }) {
  return (
    <section
      id={id}
      style={{
        minHeight: "100vh",
        padding: "120px 0",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
