import { useEffect, useRef, useState } from "react";


export default function ProfileCard({
  avatarUrl = "/Gokul.jpeg",
  iconUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = "rgba(125, 190, 255, 0.67)",
  behindGlowSize = "50%",
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Gokul Ramar",
  title = "Senior Full-Stack Developer",
  handle = "gokulr",
  status = "Open to Work",
  contactText = "Hire Me",
  showUserInfo = true,
  onContactClick,
}) {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  /* ---- Cursor tracking (glow + tilt) ---- */
  const onMove = (e) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x: px, y: py });

    if (enableTilt && (window.matchMedia("(pointer:fine)").matches || enableMobileTilt)) {
      const sens = enableMobileTilt && !window.matchMedia("(pointer:fine)").matches
        ? mobileTiltSensitivity
        : 12;
      setTilt({
        ry: ((px - 50) / 50) * sens,
        rx: -((py - 50) / 50) * sens,
      });
    }
  };

  const onLeave = () => {
    setPos({ x: 50, y: 50 });
    setTilt({ rx: 0, ry: 0 });
  };

  /* ---- Mobile device motion tilt (DISABLED for stability) ---- */
  useEffect(() => {
    // Disabled to prevent erratic scrolling behavior on mobile devices.
  }, []);

  const onContact = () => {
    if (typeof onContactClick === "function") {
      onContactClick();
    } else if (handle) {
      try {
        document
          .querySelector('button.nav-link, .nav a[href*="contact"], .nav-cta, .btn-ghost.nav-cta')
          ?.click();
      } catch {
        /* noop — no accessible nav contact CTA to auto-click */
      }
    }
  };

  /* ---- Default inner gradient (matches React Bits dark navy + indigo haze) ---- */
  const bgGradient =
    innerGradient ||
    "radial-gradient(120% 80% at 50% 10%, #1e1b4b 0%, #0b1026 55%, #050816 100%)";

  /* ---- Icon pattern SVG (data URI — matches the 2x2 angular brackets in the React Bits preview) ---- */
  const iconPattern =
    iconUrl ||
    "data:image/svg+xml;utf8," +
      encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
          <g fill='none' stroke='%23818cf8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' opacity='0.28'>
            <polyline points='68,36 44,60 68,84'/>
            <polyline points='92,76 116,100 92,124'/>
            <polyline points='44,100 68,124' opacity='0.45'/>
            <polyline points='116,60 92,36' opacity='0.45'/>
          </g>
        </svg>
      `);

  /* ---- Grain SVG (data URI) — fine noise for premium feel ---- */
  const grainPattern =
    grainUrl ||
    "data:image/svg+xml;utf8," +
      encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>
          <filter id='n'>
            <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
            <feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.45 0'/>
          </filter>
          <rect width='100%' height='100%' filter='url(%23n)' opacity='0.22'/>
        </svg>
      `);

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={"profilecard-wrap " + className}
      style={{ perspective: "1200px" }}
    >
      {/* Behind card glow (follows cursor) */}
      {behindGlowEnabled && (
        <span
          className="profilecard-behind"
          style={{
            "--gx": pos.x + "%",
            "--gy": pos.y + "%",
            "--gc": behindGlowColor,
            "--gs": behindGlowSize,
          }}
        />
      )}

      {/* Card surface */}
      <div
        className="profilecard-surface"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          background: bgGradient,
        }}
      >
        {/* Icon pattern overlay */}
        <div
          className="profilecard-layer profilecard-icons"
          style={{
            backgroundImage: `url("${iconPattern}")`,
            backgroundSize: "320px 320px",
            backgroundPosition: "50% 55%",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 45%, #000 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 45%, #000 0%, transparent 75%)",
          }}
        />

        {/* Grain overlay */}
        <div
          className="profilecard-layer profilecard-grain"
          style={{
            backgroundImage: `url("${grainPattern}")`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Inner colored vignette (light beam on avatar) */}
        <div
          className="profilecard-layer profilecard-vignette"
          style={{
            background:
              "radial-gradient(60% 45% at 52% 72%, rgba(129,140,248,0.22) 0%, rgba(14,165,233,0.06) 45%, transparent 75%)",
          }}
        />

        {/* Cursor-following inner highlight */}
        <div
          className="profilecard-layer profilecard-highlight"
          style={{
            background: `radial-gradient(circle 240px at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.12), transparent 60%)`,
          }}
        />

        {/* User info header */}
        {showUserInfo && (
          <div className="profilecard-info">
            <div className="profilecard-name">{name}</div>
            <div className="profilecard-title">{title}</div>
          </div>
        )}

        {/* Main avatar */}
        <div className="profilecard-avatar-wrap">
          <img
            src={avatarUrl}
            alt={name}
            className="profilecard-avatar"
            draggable={false}
          />
          {/* subtle color tint under avatar */}
          <span
            className="profilecard-avatar-halo"
            style={{
              background:
                "radial-gradient(closest-side, rgba(129,140,248,0.35), rgba(129,140,248,0) 70%)",
            }}
          />
        </div>

        {/* Footer CTA bar */}
        {showUserInfo && (
          <div className="profilecard-footer">
            <div className="profilecard-user-mini">
              <div className="profilecard-mini-wrap">
                <img
                  src={miniAvatarUrl || avatarUrl}
                  alt=""
                  className="profilecard-mini"
                  draggable={false}
                />
                <span className="profilecard-dot" />
              </div>
              <div className="profilecard-user-text">
                <div className="profilecard-handle">@{handle}</div>
                <div className="profilecard-status">
                  <span className="profilecard-status-dot" />
                  {status}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onContact}
              className="profilecard-contact"
            >
              {contactText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
