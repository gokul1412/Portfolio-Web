import { SERVICES } from "../data/constants";

export function Services({ setPage }) {
  return (
    <main className="section" style={{ paddingTop: "calc(var(--nav-h) + 64px)" }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Services</span>
          <h2>What I Can<br />Do For <span className="gradient-text">You</span></h2>
          <div className="divider" />
          <p>Transparent pricing. Clear deliverables. No surprises.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card fade-in" style={{ animationDelay: `${i * 0.08}s` }} key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: 10, lineHeight: 1.7 }}>{s.desc}</p>
              <div style={{ marginTop: 16 }}>
                {["Discovery call", "Detailed proposal", "Iterative delivery", "Post-launch support"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "var(--muted)", padding: "4px 0" }}>
                    <span style={{ color: "var(--accent)" }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <div className="service-price">
                <span className="price-tag">{s.price}</span>
                <button className="btn btn-ghost" style={{ fontSize: "0.75rem", padding: "7px 14px" }} onClick={() => setPage("Contact")}>Get Quote</button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-glass" style={{ marginTop: 80, textAlign: "center", padding: "72px 44px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.1), transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -80, left: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.08), transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="eyebrow">Ready to Start?</span>
            <h2 style={{ marginTop: 8 }}>Let's Build Something<br /><span className="gradient-text">Amazing Together</span></h2>
            <p style={{ color: "var(--muted)", marginTop: 16, maxWidth: 500, margin: "16px auto 32px", lineHeight: 1.75 }}>I'm available for freelance projects and consulting engagements. Let's discuss your idea.</p>
            <button className="btn btn-primary" onClick={() => setPage("Contact")}>Start a Project →</button>
          </div>
        </div>
      </div>
    </main>
  );
}
