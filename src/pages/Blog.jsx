import { useState, useReducer } from "react";
import { CATEGORIES } from "../data/constants";
import { blogReducer, initialBlogState } from "../reducers/blogReducer";

export function Blog() {
  const [state, dispatch] = useReducer(blogReducer, initialBlogState);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", excerpt: "", category: "Technology", emoji: "✍️" });
  const [toast, setToast] = useState(null);
  const postsPerPage = 3;

  const EMOJIS = ["✍️", "🚀", "💡", "🔥", "🎯", "📚", "⚙️", "🌐"];

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = state.posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / postsPerPage);
  const paginated = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const addPost = () => {
    if (!newPost.title.trim() || !newPost.excerpt.trim()) return;
    dispatch({ type: "ADD", payload: { ...newPost, date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), readTime: "3 min", bg: "#001420" } });
    setNewPost({ title: "", excerpt: "", category: "Technology", emoji: "✍️" });
    setShowForm(false);
    showToast("✅ Post published successfully!");
  };

  return (
    <main className="section" style={{ paddingTop: "calc(var(--nav-h) + 64px)" }}>
      {toast && <div className="toast">{toast}</div>}
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Blog</span>
          <h2>Thoughts &amp; <span className="gradient-text">Insights</span></h2>
          <div className="divider" />
        </div>

        <div className="blog-grid">
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
              <input className="form-input" placeholder="Search posts…" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} style={{ flex: 1 }} />
              <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>{showForm ? "Cancel" : "+ New Post"}</button>
            </div>

            {showForm && (
              <div className="card" style={{ marginBottom: 28 }}>
                <h3 style={{ marginBottom: 20 }}>✍️ New Post</h3>
                <div className="form-group">
                  <label className="form-label">Emoji</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {EMOJIS.map(e => (
                      <button key={e} onClick={() => setNewPost(p => ({ ...p, emoji: e }))}
                        style={{ width: 40, height: 40, border: `2px solid ${newPost.emoji === e ? "var(--accent)" : "var(--border)"}`, borderRadius: 8, background: "transparent", cursor: "pointer", fontSize: "1.2rem" }}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input className="form-input" value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))} placeholder="Post title…" />
                </div>
                <div className="form-group">
                  <label className="form-label">Excerpt *</label>
                  <textarea className="form-textarea" value={newPost.excerpt} onChange={e => setNewPost(p => ({ ...p, excerpt: e.target.value }))} placeholder="Brief summary…" style={{ minHeight: 80 }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={newPost.category} onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <button className="btn btn-primary" onClick={addPost} style={{ width: "100%", justifyContent: "center" }}>Publish Post →</button>
              </div>
            )}

            <div className="blog-list">
              {paginated.map(p => (
                <div className="blog-card" key={p.id}>
                  <div className="blog-thumb" style={{ background: p.bg }}>{p.emoji}</div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>📅 {p.date}</span>
                      <span>⏱ {p.readTime} read</span>
                      <span style={{ color: "var(--accent)" }}>{p.category}</span>
                    </div>
                    <h3 style={{ fontSize: "1rem" }}>{p.title}</h3>
                    <p className="blog-excerpt">{p.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="read-more">Read more →</span>
                      <button className="btn btn-ghost" style={{ padding: "5px 12px", fontSize: "0.72rem", color: "#e55", borderColor: "#e55" }}
                        onClick={() => { dispatch({ type: "DELETE", id: p.id }); showToast("🗑️ Post deleted."); }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {paginated.length === 0 && <div style={{ textAlign: "center", color: "var(--muted)", padding: "48px 0" }}>No posts found.</div>}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} className={`page-btn ${currentPage === i + 1 ? "active" : ""}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))}
                <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>›</button>
              </div>
            )}
          </div>

          <aside>
            <div className="sidebar-widget">
              <div className="sidebar-title">Categories</div>
              {CATEGORIES.map(c => {
                const count = state.posts.filter(p => p.category === c).length;
                return count > 0 ? (
                  <div key={c} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", cursor: "pointer", fontSize: "0.85rem" }} onClick={() => setSearch(c)}>
                    <span style={{ color: "var(--muted)" }}>{c}</span>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{count}</span>
                  </div>
                ) : null;
              })}
            </div>
            <div className="sidebar-widget">
              <div className="sidebar-title">Quick Stats</div>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 2 }}>
                <div>Total Posts: <strong style={{ color: "var(--text)" }}>{state.posts.length}</strong></div>
                <div>Total Reads: <strong style={{ color: "var(--text)" }}>12.4K</strong></div>
                <div>Avg Read Time: <strong style={{ color: "var(--text)" }}>6.5 min</strong></div>
              </div>
            </div>
            <div className="sidebar-widget">
              <div className="sidebar-title">Newsletter</div>
              <p style={{ color: "var(--muted)", fontSize: "0.8rem", marginBottom: 12 }}>Weekly tips on React, performance, and web dev.</p>
              <input className="form-input" placeholder="Your email…" style={{ marginBottom: 10 }} />
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Subscribe →</button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
