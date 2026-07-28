import { useState } from "react";
import { ALL_PROJECTS } from "../data/constants";

export function Projects() {
  const categories = ["All", "Web", "Mobile", "Dashboard", "E-commerce"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.category === active);

  return (
    <main className="section" style={{ paddingTop: "calc(var(--nav-h) + 64px)" }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Portfolio</span>
          <h2>Selected <span className="gradient-text">Projects</span></h2>
          <div className="divider" />
          <p>A curated selection of work across web, mobile, and data visualization.</p>
        </div>
        <div className="filter-bar">
          {categories.map(c => (
            <button key={c} className={`filter-btn ${active === c ? "active" : ""}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((p, i) => (
            <div className="project-card fade-in" style={{ animationDelay: `${i * 0.07}s` }} key={p.id}>
              <div className="project-thumb" style={{ background: p.bg }}>
                <span style={{ fontSize: "3.5rem", zIndex: 1, position: "relative" }}>{p.emoji}</span>
              </div>
              <div className="project-body">
                <h3 style={{ fontSize: "1.1rem" }}>{p.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginTop: 6, lineHeight: 1.6 }}>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Live Demo</button>
                  <a href="https://github.com/gokul1412?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ flex: 1, justifyContent: "center", display: "flex", alignItems: "center", textDecoration: "none" }}>GitHub →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
