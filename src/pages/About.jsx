import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ProfileCard from "../components/ProfileCard";
import { useSkillsVisible } from "../hooks/useSkillsVisible";
import { useWeather } from "../hooks/useWeather";
import { SKILLS, TIMELINE } from "../data/constants";

export function About({ setPage }) {
  const [visible, ref] = useSkillsVisible();
  const weather = useWeather();

  return (
    <main className="section" style={{ paddingTop: "calc(var(--nav-h) + 64px)" }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">About Me</span>
          <h2>The Developer<br />Behind the <span className="gradient-text">Code</span></h2>
          <div className="divider" />
        </div>
        <div className="about-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", paddingTop: 6 }}>
            <ProfileCard
              avatarUrl="/Gokul.jpeg"
              miniAvatarUrl="/Gokul.jpeg"
              name="Gokul R"
              title="Software Developer"
              handle="gokulr"
              status="Open to Work"
              contactText="Hire Me"
              behindGlowColor="rgba(129, 140, 248, 0.72)"
              onContactClick={() => {
                if (typeof setPage === "function") setPage("Contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            {weather && (
              <div style={{
                marginTop: 22, width: "100%", maxWidth: 420, marginInline: "auto", padding: "18px 20px", borderRadius: "var(--radius)", background: "var(--glass-bg)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)", border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-sm)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.68rem", color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
                  <FaMapMarkerAlt /> Chennai · Live Weather
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.65rem", fontWeight: 900, color: "var(--text-h)", lineHeight: 1.1 }}>
                  {weather.temp}°C · <span style={{ fontWeight: 700, fontSize: "1.1rem", opacity: 0.9 }}>{weather.desc}</span>
                </div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", fontSize: "0.82rem", color: "var(--muted)", fontWeight: 500 }}>
                  <span>💧 Humidity: {weather.humidity}%</span>
                  <span style={{ opacity: 0.35 }}>·</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><FaClock /> Local time</span>
                </div>
              </div>
            )}
          </div>
          <div>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Hi! I'm <strong style={{ color: "var(--text-h)" }}>GOKUL RAMAR</strong>, a Software Developer from Chennai, Tamil Nadu. I specialise in designing and building highly scalable, resilient enterprise applications and leading high-performance engineering teams.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem", marginTop: 16 }}>
              With over 3+years of deep technical experience across global tech hubs, I've architected systems that handle millions of daily transactions. I am deeply passionate about system design, elite developer experience, and delivering uncompromising quality.
            </p>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 28 }}>
              {[["Age", "23"], ["City", "Chennai"], ["Consulting", "Available"], ["Languages", "Tamil · English"]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: "0.65rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>

            <div className="skills-bar" ref={ref} style={{ marginTop: 32 }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>Core Skills</div>
              {SKILLS.map(s => (
                <div className="skill-item" key={s.name}>
                  <div className="skill-header"><span style={{ fontSize: "0.82rem" }}>{s.name}</span><span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>{s.pct}%</span></div>
                  <div className="skill-track"><div className="skill-fill" style={{ width: visible ? `${s.pct}%` : "0%" }} /></div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 28 }}>📄 Download CV</button>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginTop: 80 }}>
          <span className="eyebrow">Experience</span>
          <h2 style={{ marginBottom: 32 }}>Career <span className="gradient-text">Timeline</span></h2>
          <div className="timeline">
            {TIMELINE.map(t => (
              <div className="timeline-item" key={t.year}>
                <div className="timeline-dot" />
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-title">{t.title}</div>
                <div className="timeline-sub">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
