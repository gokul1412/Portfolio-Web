import { SERVICES } from "../data/constants";
import { StatCard } from "../components/ui/StatCard";

export function Home({ setPage }) {
  return (
    <main>
      {/* HERO */}
      <section className="hero section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy fade-in">
              <div className="hero-badge"><span className="hero-badge-dot" /> Available for consultancy</div>
              <h1>
                Senior{" "}
                <span className="gradient-text">Software Developer</span>
              </h1>
              <p>
                I architect and engineer scalable, enterprise-grade digital products. Based in Chennai — consulting globally.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => setPage("Projects")}>View Projects →</button>
                <button className="btn btn-outline" onClick={() => setPage("Contact")}>Let's Talk</button>
              </div>
              <div className="stat-grid">
                <StatCard target={15} suffix="+" label="Enterprise Projects" />
                <StatCard target={3} suffix="yr" label="Experience" />
                <StatCard target={12} suffix="+" label="Global Clients" />
              </div>
            </div>
            <div className="hero-visual fade-in fade-in-delay-2">
              <div className="hero-ring" style={{ width: 420, height: 420 }} />
              <div className="hero-ring" style={{ width: 340, height: 340, animationDirection: "reverse", animationDuration: "14s" }} />
              <div className="hero-avatar">
                <img src="/Gokul.jpeg" alt="Profile" className="hero-avatar-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="section-sm">
        <div className="container">
          <div style={{ textAlign: "center" }}><span className="eyebrow">Tech Stack</span></div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 24 }}>
            {["React", "JavaScript", "Node.js", "Python", "MySQL", "Firebase", "Docker", "DigitalOcean", "Figma", "Java"].map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">What I Do</span>
            <h2>Services Built<br />to <span className="gradient-text">Scale</span></h2>
            <div className="divider" />
            <p>End-to-end digital solutions — from ideation and design to deployment and maintenance.</p>
          </div>
          <div className="services-grid">
            {SERVICES.slice(0, 3).map((s, i) => (
              <div className="service-card fade-in" style={{ animationDelay: `${i * 0.1}s` }} key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: 10, lineHeight: 1.7 }}>{s.desc}</p>
                <div className="service-price">
                  <span className="price-tag">{s.price}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{s.per}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn btn-outline" onClick={() => setPage("Services")}>View All Services →</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="eyebrow">Testimonials</span>
            <h2>What Clients <span className="gradient-text">Say</span></h2>
            <div className="divider" style={{ margin: "16px auto 28px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {[
              { name: "Darwin", role: "CEO, BudgetProperty", quote: "Gokul delivered our Real estate platform two weeks early. The code quality and design were exceptional.", avatar: "👨" },
              { name: "Mouna", role: "CEO, Kriya-Boutique", quote: "Best developer I've worked with. He communicates clearly and always finds elegant solutions to complex problems.", avatar: "👩‍💼" },
              { name: "Lakshmi V.", role: "Founder, Deadline-pay", quote: "Our dashboard went from sluggish to lightning fast. Users noticed immediately. Highly recommend!", avatar: "👩‍🎓" },
            ].map(t => (
              <div className="card" key={t.name}>
                <div style={{ fontSize: "2.2rem", marginBottom: 12, color: "var(--accent)", opacity: 0.7 }}>❝</div>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--glass-bg)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-h)" }}>{t.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.75rem" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
