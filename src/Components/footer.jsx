import { useState } from "react";
import Logo from "../assets/logo.png"

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="1.5" />
    <path
      d="M13.5 8.5H15.5V6H13.5C11.843 6 10.5 7.343 10.5 9V10.5H9V13H10.5V19H13V13H15L15.5 10.5H13V9C13 8.724 13.224 8.5 13.5 8.5Z"
      fill="white"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="1.5" />
    <path
      d="M17 8L13.5 12L17 16H15.2L12.5 12.9L9.8 16H8L11.5 12L8 8H9.8L12.5 11.1L15.2 8H17Z"
      fill="white"
    />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <div style={{ width: "100%", background: "white", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* ── WHITE TOP CARD ── */}
      <div
        style={{
          background: "#ffffff",
          borderTop: "solid red",
          borderRadius: "40px 40px 0 0",
          padding: "20px 70px 20px 70px ",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Oracle Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img src={Logo} alt="logo" className="w-60 h-auto" />
        </div>

        {/* Stay in the Loop */}
        <div style={{ textAlign: "right" }}>
          <h2 style={{ fontSize: "54px", fontWeight: 900, color: "#9b0000", margin: "0 0 8px 0", lineHeight: 1.1 }}>
            Stay in the Loop
          </h2>
          <p style={{ color: "#666", fontSize: "15px", margin: 0 }}>
            Get event updates and Oracle insights straight to your inbox.
          </p>
        </div>
      </div>

      {/* ── RED GRADIENT BODY ── */}
      <div
        style={{
          background: "linear-gradient(180deg, #e30000 0%, #8c0000 55%, #4d0000 100%)",
          borderRadius: "36px 36px 0 0",
          padding: "120px 80px 0 80px",
          height: "60vh"
        }}
      >
        {/* Content row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.8fr 1fr",
            gap: "60px",
            paddingBottom: "100px",
            alignItems: "start",
          }}
        >
          {/* Col 1: About */}
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.75, margin: 0 }}>
            High level experience in web design and development knowledge, producing quality work.
          </p>

          {/* Col 2: Subscribe */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.75, marginBottom: "22px", marginTop: 0 }}>
              Subscribe to stay tuned for new web design and latest updates. Let's do it!
            </p>
            <div style={{ display: "flex" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email Address"
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  fontSize: "14px",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.07)",
                  color: "white",
                  outline: "none",
                  borderRadius: "6px 0 0 6px",
                  boxSizing: "border-box",
                }}
              />
              <button
                style={{
                  padding: "14px 30px",
                  background: "white",
                  color: "#900",
                  fontWeight: 700,
                  fontSize: "14px",
                  border: "none",
                  borderRadius: "0 6px 6px 0",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Col 3: Follow + Call */}
          <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "white", fontWeight: 700, fontSize: "15px", margin: "0 0 14px 0" }}>Follow us</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <a href="#"><InstagramIcon /></a>
                <a href="#"><FacebookIcon /></a>
                <a href="#"><TwitterIcon /></a>
              </div>
            </div>
            <div>
              <p style={{ color: "white", fontWeight: 700, fontSize: "15px", margin: "0 0 14px 0" }}>Call us</p>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", margin: 0 }}>+1 800 854-36-80</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.18)",
            padding: "20px 0 24px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: 0 }}>
            © 2021 All Rights Reserved
          </p>
          <div style={{ display: "flex", gap: "36px" }}>
            {["Privacy Policy", "Terms of Use", "Sales and Refunds", "Legal", "Site Map"].map((link) => (
              <a
                key={link}
                href="#"
                style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}