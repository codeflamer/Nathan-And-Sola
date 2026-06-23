export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FDF0CD",
        color: "#3A2B26",
        fontFamily: "Georgia, serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>S &amp; N</p>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Page not found</h1>
      <a href="/" style={{ color: "#C59283" }}>
        Back to the wedding
      </a>
    </div>
  );
}
