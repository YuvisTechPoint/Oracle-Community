import React from 'react';
import { row1Partners, row2Partners } from '../Details/CrausalDetails';

/* ─────────────────────────── Logo Card ─────────────────────────────── */
function LogoCard({ partner }) {
  return (
    <div
      style={{
        margin: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '175px',
        height: '98px',
        flexShrink: 0,
        cursor: 'default',
        userSelect: 'none',
        transition: 'transform 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img
        src={partner.logo}
        alt={partner.alt}
        style={{ maxWidth: '150px', maxHeight: '80px', objectFit: 'contain' }}
        draggable={false}
      />
    </div>
  );
}

/* ─────────────────────────── Main Component ─────────────────────────── */
export default function Carousel() {
  const track1 = [...row1Partners, ...row1Partners];
  const track2 = [...row2Partners, ...row2Partners];

  return (
    <>
      <style>{`
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%);   }
        }
        @keyframes scrollLeft {
          from { transform: translateX(0%);   }
          to   { transform: translateX(-50%); }
        }
        .carousel-right {
          animation: scrollRight 30s linear infinite;
          will-change: transform;
        }
        .carousel-left {
          animation: scrollLeft 30s linear infinite;
          will-change: transform;
        }
        .carousel-right:hover,
        .carousel-left:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section style={{ width: '100%', background: 'white', overflow: 'hidden', margin: 0, padding: 0 }}>

        {/* Red divider — top */}
        <div style={{ width: '100%', height: '2px', backgroundColor: '#cc0000', opacity: 0.35, margin: '20px 0' }} />

        {/* ── Row 1 — scrolls RIGHT ── */}
        <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0, height: '100%', width: '112px', zIndex: 10, background: 'linear-gradient(to right, white, transparent)' }} />
          <div style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0, height: '100%', width: '112px', zIndex: 10, background: 'linear-gradient(to left, white, transparent)' }} />
          <div className="flex carousel-right" style={{ width: 'max-content' }}>
            {track1.map((partner, i) => (
              <LogoCard key={`r1-${i}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Red divider — middle */}
        <div style={{ width: '100%', height: '2px', backgroundColor: '#cc0000', opacity: 0.35, margin: '20px 0' }} />

        {/* ── Row 2 — scrolls LEFT ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0, height: '100%', width: '112px', zIndex: 10, background: 'linear-gradient(to right, white, transparent)' }} />
          <div style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0, height: '100%', width: '112px', zIndex: 10, background: 'linear-gradient(to left, white, transparent)' }} />
          <div className="flex carousel-left" style={{ width: 'max-content' }}>
            {track2.map((partner, i) => (
              <LogoCard key={`r2-${i}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Red divider — bottom */}
        <div style={{ width: '100%', height: '2px', backgroundColor: '#cc0000', opacity: 0.35, margin: '20px 0' }} />

      </section>
    </>
  );
}
