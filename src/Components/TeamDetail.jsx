import { useState, useRef, useEffect, useCallback } from "react";
import { teamMembers } from "../Details/TeamMembers";
import close from "../assets/close.svg";
import { Typewriter } from 'react-simple-typewriter'



const TOTAL = teamMembers.length;

// Compute 3D transform for each card based on its offset from center
function getCardStyle(offset, total, isMobile) {
  // offset: -3 to +3 from center (0)
  const absOff = Math.abs(offset);
  const sign = Math.sign(offset);

  // Smaller spread on mobile
  const spreadFactor = isMobile ? 80 : 170;

  // Rotation: side cards tilt inward
  const rotateY = -offset * (isMobile ? 8 : 12); // degrees, tilt toward center
  // Horizontal spread
  const translateX = offset * spreadFactor;
  // Push back side cards (Z depth)
  const translateZ = -absOff * absOff * (isMobile ? 15 : 28);
  // Lift center card up, sides drop down creating arc
  const translateY = absOff * absOff * (isMobile ? 10 : 18) - (absOff === 0 ? (isMobile ? 10 : 18) : 0);
  // Scale: center biggest
  const scale = 1 - absOff * (isMobile ? 0.1 : 0.07);
  // Opacity fade for far edges
  const opacity = absOff > 2.5 ? 0.35 : absOff > 1.8 ? 0.6 : absOff > 0.8 ? 0.85 : 1;
  // zIndex
  const zIndex = 10 - Math.round(absOff);

  return {
    transform: `perspective(${isMobile ? 800 : 1200}px) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
    opacity,
    zIndex,
    transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease",
  };
}

export default function TeamCarousel() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [centerIdx, setCenterIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRef = useRef(null);
  const isPausedRef = useRef(false);

  const advance = useCallback((dir = 1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCenterIdx(prev => (prev + dir + TOTAL) % TOTAL);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (!isPausedRef.current) advance(1);
    }, 2800);
    return () => clearInterval(autoRef.current);
  }, [advance]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

      .modal-overlay { animation: fadeIn 0.25s ease; }
      .modal-card { animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }

      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp {
        from { opacity: 0; transform: scale(0.85) translateY(30px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }

      .badge {
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.6);
      }

      .form-input {
        width: 100%;
        padding: 10px 14px;
        border: 1.5px solid #e5e7eb;
        border-radius: 10px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;
        background: white;
        box-sizing: border-box;
      }
      .form-input:focus { border-color: #6366f1; }

      .nav-btn {
        width: 44px; height: 44px;
        border-radius: 50%;
        border: 1.5px solid #e5e7eb;
        background: white;
        cursor: pointer;
        font-size: 18px;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        transition: all 0.2s;
        color: #374151;
      }
      .nav-btn:hover {
        background: #6366f1;
        color: white;
        border-color: #6366f1;
        box-shadow: 0 4px 14px rgba(99,102,241,0.35);
        transform: scale(1.08);
      }

      .dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: #d1d5db;
        transition: all 0.3s;
        cursor: pointer;
      }
      .dot.active {
        background: #6366f1;
        width: 22px;
        border-radius: 4px;
      }

      .card-3d {
        position: absolute;
        width: 140px;
        border-radius: 16px;
        overflow: hidden;
        cursor: pointer;
        transform-origin: center bottom;
        transform-style: preserve-3d;
        will-change: transform;
        left: 50%;
        margin-left: -70px;
        top: 0;
      }
      @media (min-width: 640px) {
        .card-3d {
          width: 200px;
          margin-left: -100px;
          border-radius: 22px;
        }
      }

      .card-3d:hover .card-hover-lift {
        filter: brightness(1.04);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif", background: "white", minHeight: "100vh" }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: "center", paddingTop: 40, maxWidth: 720, margin: "0 auto", padding: "40px 16px 20px" }} className="sm:pt-12 md:pt-16 sm:px-6">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #e5e7eb", borderRadius: 999, padding: "5px 12px 5px 8px", marginBottom: 20, fontSize: 12, fontWeight: 500, color: "#374151", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }} className="sm:gap-2 sm:px-3 sm:py-1.5 sm:mb-7 sm:text-[13px]">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} className="sm:w-2 sm:h-2" />
          <span className="hidden sm:inline">Growing with 500+ members — Be part of it →</span>
          <span className="sm:hidden">500+ members — Join us →</span>
          <span style={{ color: "#6366f1", fontWeight: 600, cursor: "pointer" }}>Careers →</span>
        </div>

        <h1 className="hero-title sm:!text-[28px] md:!text-[36px] lg:!text-[46px] sm:!leading-[1.25] sm:!mb-4" style={{ fontSize: "24px", fontWeight: 700, color: "#0f0f1a", lineHeight: 1.3, marginBottom: 12, fontFamily: "'Playfair Display', serif" }}>
          Learn Oracle. Build skills. Connect with the community.<br className="hidden sm:block" />
          <em className="block mt-2 sm:mt-0">
            <Typewriter
              words={["Learning", "building", " & growing together"]}
              loop={5}
              cursor
              cursorStyle='|'
              typeSpeed={40}
              deleteSpeed={50}
              delaySpeed={1000}
            /></em>
        </h1>

        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }} className="sm:text-[15px] sm:leading-[1.7] sm:mb-8">
          Join the Oracle Kolkata Community to connect, collaborate, and innovate with developers, students, and professionals.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 999, border: "1.5px solid #d1d5db", background: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#374151", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }} className="sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"}
          >
            <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }} className="sm:w-5 sm:h-5">
              <span style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "6px solid white", marginLeft: 1 }} className="sm:border-t-[5px] sm:border-b-[5px] sm:border-l-[8px] sm:ml-0.5" />
            </span>
            View demo
          </button>
          <button style={{ padding: "9px 18px", borderRadius: 999, border: "none", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(99,102,241,0.4)", transition: "all 0.2s" }} className="sm:px-6 sm:py-2.5 sm:text-sm"
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(99,102,241,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.4)"; }}
          >
            Get started
          </button>
        </div>
      </div>

      {/* 3D Curved Carousel */}
      <div
        style={{ position: "relative", height: 260, margin: "24px 0 16px", userSelect: "none" }} className="sm:h-[300px] sm:my-8 sm:mb-5 md:h-[340px]"
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; }}
      >
        {/* Render cards — visible window: center ±3 */}
        {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
          const idx = ((centerIdx + offset) % TOTAL + TOTAL) % TOTAL;
          const member = teamMembers[idx];
          // Check if mobile for responsive card styles
          const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
          const style3d = getCardStyle(offset, TOTAL, isMobile);
          const isCenter = offset === 0;

          return (
            <div
              key={`${idx}-${offset}`}
              className="card-3d"
              style={{
                ...style3d,
                boxShadow: isCenter
                  ? "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)"
                  : "0 8px 28px rgba(0,0,0,0.1)",
              }}
              onClick={() => {
                if (offset === 0) setSelectedCard(member);
                else advance(offset > 0 ? 1 : -1);
              }}
            >
              <div
                className="card-hover-lift"
                style={{ transition: "filter 0.3s" }}
              >
                {/* Card image */}
                <div style={{
                  height: isCenter ? 170 : 150,
                  background: member.color,
                  overflow: "hidden",
                  transition: "height 0.5s ease",
                }} className="sm:h-[220px] sm:data-[center=true]:h-[250px]" data-center={isCenter}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* Card footer */}
                <div style={{
                  background: isCenter
                    ? "rgba(10,10,24,0.92)"
                    : "rgba(15,15,30,0.82)",
                  backdropFilter: "blur(12px)",
                  padding: isCenter ? "10px 12px" : "8px 10px",
                  transition: "all 0.4s",
                }} className="sm:p-[10px_14px] sm:data-[center=true]:p-[13px_16px]" data-center={isCenter}>
                  <div style={{ fontWeight: 700, fontSize: isCenter ? 12 : 10, color: "white", letterSpacing: 0.3 }} className="sm:text-xs sm:data-[center=true]:text-sm" data-center={isCenter}>{member.name}</div>
                  <div style={{ fontSize: isCenter ? 10 : 9, color: isCenter ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.55)", marginTop: 2 }} className="sm:text-[10px] sm:data-[center=true]:text-xs" data-center={isCenter}>{member.role}</div>
                  {isCenter && (
                    <div style={{ marginTop: 6, fontSize: 9, color: "#a5b4fc", fontWeight: 600, letterSpacing: 0.5 }} className="sm:mt-2 sm:text-[10px]">
                      CLICK TO VIEW →
                    </div>
                  )}
                </div>
              </div>

              {/* Center card glow ring */}
              {isCenter && (
                <div style={{
                  position: "absolute", inset: -2,
                  borderRadius: 18,
                  border: "2px solid rgba(99,102,241,0.5)",
                  pointerEvents: "none",
                  boxShadow: "0 0 20px rgba(99,102,241,0.2)",
                }} className="sm:rounded-[24px]" />
              )}
            </div>
          );
        })}

        {/* Fade edges */}

      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 50 }}>
        <button className="nav-btn" onClick={() => advance(-1)}>‹</button>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {teamMembers.map((_, i) => (
            <div
              key={i}
              className={`dot${i === centerIdx ? " active" : ""}`}
              onClick={() => {
                const diff = i - centerIdx;
                if (diff !== 0) advance(diff > 0 ? 1 : -1);
              }}
            />
          ))}
        </div>

        <button className="nav-btn" onClick={() => advance(1)}>›</button>
      </div>

      {/* Contact + Info Section */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>

      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCard(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(10,10,20,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}
        >
          <div
            className="modal-card"
            onClick={e => e.stopPropagation()}
            style={{ background: "white", borderRadius: 28, overflow: "hidden", maxWidth: 420, width: "100%", boxShadow: "0 40px 80px rgba(0,0,0,0.25)" }}
          >
            {/* Modal Header */}
            <div style={{ background: selectedCard.color, position: "relative", height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={selectedCard.avatar} alt={selectedCard.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

              {/* Close btn */}
              <button
                onClick={() => setSelectedCard(null)}
                style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.9)", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", fontWeight: 300 }}
              >
                <img src={close} alt="Close" className="bg-black w-6 h-6 p-1 rounded-full" />
              </button>

              {/* Department badge */}
              <div className="badge" style={{ position: "absolute", top: 16, left: 16, borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: "#374151", textTransform: "uppercase" }}>
                {selectedCard.department}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 28 }}>
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#0f0f1a", marginBottom: 4 }}>{selectedCard.name}</h2>
                <p style={{ fontSize: 14, color: "#6366f1", fontWeight: 600 }}>{selectedCard.role}</p>
              </div>

              <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.75, marginBottom: 24 }}>{selectedCard.bio}</p>

              {/* Stats */}
              <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                {[
                  { label: "Tickets resolved", value: selectedCard.stats.tickets },
                  { label: "Rating", value: `⭐ ${selectedCard.stats.rating}` },
                  { label: "Avg response", value: selectedCard.stats.response },
                ].map(stat => (
                  <div key={stat.label} style={{ background: "#f8f9fc", borderRadius: 12, padding: "10px 14px", flex: 1, minWidth: 90, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#0f0f1a" }}>{stat.value}</div>
                    <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2, fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <button
                style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(99,102,241,0.35)", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Connect with {selectedCard.name.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}