import { useState, useCallback } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { SERVICES } from "../data/constants";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);

    try {
      const res = await fetch("https://formsubmit.co/ajax/gokulr141203@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `New Portfolio Enquiry from ${form.name}`,
          name: form.name, email: form.email, phone: form.phone || "Not provided",
          service: form.service || "Not provided", budget: form.budget || "Not provided",
          message: form.message
        })
      });

      if (res.ok) setSubmitted(true);
      else setErrors({ submit: "Failed to send message. Please try again." });
    } catch (err) {
      setErrors({ submit: "Network error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const update = useCallback((field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  }, []);

  return (
    <main className="section" style={{ paddingTop: "calc(var(--nav-h) + 64px)" }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Contact</span>
          <h2>Let's Work<br /><span className="gradient-text">Together</span></h2>
          <div className="divider" />
          <p>Have a project in mind? Fill out the form and I'll get back within 24 hours.</p>
        </div>

        <div className="contact-grid">
          <div>
            {[
              { icon: <FaMapMarkerAlt />, title: "Location", val: "Chennai, Tamil Nadu, India" },
              { icon: <FaEnvelope />, title: "Email", val: "gokulr141203@gmail.com" },
              { icon: <FaPhoneAlt />, title: "Phone", val: "+91 9080285866" },
              { icon: <FaClock />, title: "Response Time", val: "Within 24 hours" },
            ].map(i => (
              <div className="contact-info-item" key={i.title}>
                <div className="contact-icon">{i.icon}</div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{i.title}</div>
                  <div style={{ marginTop: 4, fontWeight: 500 }}>{i.val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Find Me On</div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href="https://github.com/gokul1412" target="_blank" rel="noreferrer" className="social-btn"><FaGithub /></a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="social-btn"><FaLinkedin /></a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="social-btn"><FaTwitter /></a>
                <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" className="social-btn"><FaInstagram /></a>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "80px 40px" }}>
                <div style={{ fontSize: "4rem", marginBottom: 20 }}>🎉</div>
                <h3>Message Sent!</h3>
                <p style={{ color: "var(--muted)", marginTop: 12, lineHeight: 1.7 }}>Thank you for reaching out. I'll review your message and reply within 24 hours.</p>
                <button className="btn btn-outline" style={{ marginTop: 24 }} onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" }); }}>Send Another →</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className={`form-input ${errors.name ? "error" : ""}`} value={form.name} onChange={update("name")} placeholder="Enter your full name" />
                    {errors.name && <div className="field-error">{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className={`form-input ${errors.email ? "error" : ""}`} type="email" value={form.email} onChange={update("email")} placeholder="Enter your email" />
                    {errors.email && <div className="field-error">{errors.email}</div>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" value={form.phone} onChange={update("phone")} placeholder="Enter your phone number" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service Needed</label>
                    <select className="form-select" value={form.service} onChange={update("service")}>
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select className="form-select" value={form.budget} onChange={update("budget")}>
                    <option value="">Select budget…</option>
                    <option>Under ₹10,000</option>
                    <option>₹10,000 – ₹30,000</option>
                    <option>₹30,000 – ₹80,000</option>
                    <option>₹80,000+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className={`form-textarea ${errors.message ? "error" : ""}`} value={form.message} onChange={update("message")} placeholder="Tell me about your project…" style={{ minHeight: 140 }} />
                  {errors.message && <div className="field-error">{errors.message}</div>}
                </div>
                {errors.submit && <div className="field-error" style={{ marginBottom: '16px', textAlign: 'center', color: '#ef4444' }}>{errors.submit}</div>}
                <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", fontSize: "0.9rem", padding: "14px" }}>
                  {loading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
