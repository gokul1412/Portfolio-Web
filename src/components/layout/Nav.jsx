import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function Nav({ page, setPage, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pages = ["Home", "About", "Services", "Projects", "Blog", "Contact"];
  const nav = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };
  
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    }
  }, []);

  return (
    <>
      <div className={`nav-wrapper ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav-pill">
          <div className="nav-logo" onClick={() => nav("Home")}>
            <img src="/Brandlogo.png" alt="Brand Logo" className="brand-logo-img" />
            <span className="logo-text">Gokul<span className="logo-dot">.</span>R</span>
          </div>
          
          <div className="nav-links-modern">
            {pages.map(p => (
              <button 
                key={p} 
                className={`nav-link-modern ${page === p ? "active" : ""}`} 
                onClick={() => nav(p)}
              >
                {p}
                {page === p && <span className="nav-indicator" />}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <button className="btn-modern-cta" onClick={() => nav("Contact")}>
              Hire Me
            </button>
            <button className={`hamburger ${menuOpen ? "hamburger--open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "mobile-overlay--visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <img src="/Brandlogo.png" alt="Brand Logo" className="mobile-brand-logo-img" />
            Gokul<span>.</span>R
          </div>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <div className="mobile-nav-links">
          {pages.map(p => (
            <button
              key={p}
              className={`mobile-nav-item ${page === p ? "mobile-nav-item--active" : ""}`}
              onClick={() => nav(p)}
            >
              <span>{p}</span>
              {page === p && <span className="mobile-nav-indicator" />}
            </button>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <button className="btn btn-primary mobile-cta" onClick={() => nav("Contact")}>Hire Me →</button>
          <div className="mobile-social">
            <a href="https://github.com/gokul1412" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </>
  );
}
