import { useState, useEffect, useCallback } from "react";
import "./App.css";
import "./components/ProfileCard.css";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Projects } from "./pages/Projects";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";

export default function App() {
  const [page, setPage] = useState("Home");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === "dark" ? "light" : "dark");
  }, []);

  const renderPage = () => {
    switch (page) {
      case "Home": return <Home setPage={setPage} />;
      case "About": return <About setPage={setPage} />;
      case "Services": return <Services setPage={setPage} />;
      case "Projects": return <Projects />;
      case "Blog": return <Blog />;
      case "Contact": return <Contact />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", transition: "background var(--transition)" }}>
      <Nav page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      {renderPage()}
      <Footer setPage={setPage} />
    </div>
  );
}
