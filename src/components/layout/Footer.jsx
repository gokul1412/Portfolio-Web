import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { SERVICES } from "../../data/constants";

export function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" onClick={() => { setPage("Home"); window.scrollTo(0, 0); }}>
              <img src="/Brandlogo.png" alt="Brand Logo" className="brand-logo-img" />
              Gokul<span>.</span>R
            </div>
            <p>Software Developer based in Chennai, engineering scalable and resilient enterprise digital products since 2011.</p>
            <div className="social-links">
              <a href="https://github.com/gokul1412" target="_blank" rel="noreferrer" className="social-btn"><FaGithub /></a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="social-btn"><FaLinkedin /></a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="social-btn"><FaTwitter /></a>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" className="social-btn"><FaInstagram /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Pages</h4>
            {["Home", "About", "Services", "Projects", "Blog", "Contact"].map(p => (
              <button className="footer-link" key={p} onClick={() => { setPage(p); window.scrollTo(0, 0); }}>{p}</button>
            ))}
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            {SERVICES.map(s => <span className="footer-link" key={s.title} style={{ cursor: "default" }}>{s.title}</span>)}
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <span className="footer-link" style={{ cursor: "default" }}>📍 Chennai, TN</span>
            <span className="footer-link" style={{ cursor: "default" }}>📧 gokulr141203@gmail.com</span>
            <span className="footer-link" style={{ cursor: "default" }}>📱 +91 9080285866</span>
            <span className="footer-link" style={{ cursor: "default" }}>🕐 Mon – Sat, 9am – 6pm</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Dev.Gokul. All rights reserved.</span>
          <span>Built with React · Architected By GOKUL</span>
        </div>
      </div>
    </footer>
  );
}
