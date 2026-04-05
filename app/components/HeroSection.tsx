"use client";

import { useState } from "react";

const LIME = "#ff8800";
const LIME_R = 255;
const LIME_G = 136;
const LIME_B = 0;

interface HeroSectionProps {
  onOpenDrawer: () => void;
}

export default function HeroSection({ onOpenDrawer }: HeroSectionProps) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section
      id="hero-final"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: "url('/Cubic-Glass - 08.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#1A1A1A",
        overflow: "hidden",
        fontFamily: "'NeueAlte', system-ui, sans-serif",
      }}
    >
      {/* Frosted Glass Background Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          zIndex: 1,
        }}
      />

      {/* Top accent line */}
      <div
        className="hero-animate"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          zIndex: 2,
          background: `linear-gradient(90deg, rgba(${LIME_R},${LIME_G},${LIME_B},0), rgba(${LIME_R},${LIME_G},${LIME_B},0.5), rgba(${LIME_R},${LIME_G},${LIME_B},0))`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(2.5rem, 6vh, 4.5rem) clamp(2rem, 6vw, 5rem)",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ flex: 1 }}>
            {/* Brand label */}
            <div
            className="hero-animate"
            style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1A1A1A",
                marginBottom: "1.2rem",
                fontWeight: 600,
                opacity: 0.6,
            }}
            >
            Clipzy AI
            </div>

            {/* Headline */}
            <h1
            className="hero-animate"
            style={{
                fontFamily: "'NeueAlte', system-ui, sans-serif",
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                lineHeight: 1.15,
                fontWeight: 400,
                letterSpacing: "-0.02em",
                marginBottom: "0.8rem",
                color: "#0A0A0A",
            }}
            >
            Edit like viral creators
            <br />
            without <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontWeight: 400 }}>editing</span>
            </h1>

            {/* Subline */}
            <p
            className="hero-animate"
            style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                lineHeight: 1.6,
                color: "rgba(0,0,0,0.6)",
                maxWidth: "460px",
                fontWeight: 400,
                marginBottom: "1.8rem",
            }}
            >
            Upload a viral video. Upload your footage.
            <br />
            Clipzy AI recreates the editing style automatically.
            </p>

            {/* CTA Button with text swap animation */}
            <a
            href="#"
            className="hero-animate"
            id="cta-waitlist"
            onClick={(e) => {
                e.preventDefault();
                onOpenDrawer();
            }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
                display: "inline-block",
                padding: "0 2rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                fontFamily: "'NeueAlte', system-ui, sans-serif",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: btnHovered ? "#000000" : "#FFFFFF",
                backgroundColor: btnHovered ? LIME : "#1A1A1A",
                textDecoration: "none",
                border: "none",
                borderRadius: 2,
                cursor: "pointer",
                transition: "background-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease",
                boxShadow: "none",
                position: "relative",
                overflow: "hidden",
                height: "48px",
                lineHeight: "48px",
            }}
            >
            <span
                style={{
                display: "block",
                position: "relative",
                height: "48px",
                overflow: "hidden",
                }}
            >
                <span
                style={{
                    display: "block",
                    transition: "transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    transform: btnHovered ? "translateY(-48px)" : "translateY(0)",
                }}
                >
                <span style={{ display: "flex", alignItems: "center", gap: "0.75rem", height: "48px" }}>
                    Get early access <span style={{ fontSize: "1rem" }}>→</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.75rem", height: "48px" }}>
                    Join the waitlist <span style={{ fontSize: "1rem" }}>→</span>
                </span>
                </span>
            </span>
            </a>
        </div>

        {/* Grid of 5 videos placeholder */}
        <div
        className="hero-animate"
        style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
        }}
        >
        {[1, 2, 3, 4, 5].map((item, index) => (
            <div
            key={item}
            style={{
                width: "100%",
                aspectRatio: "9/16",
                backgroundColor: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.06)",
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
            >
            <video
                src={
                index % 2 === 0
                    ? "/Victor_Okafor_-_Why_is_it_that_people_who_schooled_in_Unilag_and_CU_seem_to_get_the_b..._rMUtQU.mp4"
                    : "/CHUKS____-__Pastors_building_big_auditoriums_isn_t_your_problem._If_the_Nigerian..._PdYUVi.mp4"
                }
                autoPlay
                muted
                loop
                playsInline
                style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                }}
            />
            </div>
        ))}
        </div>
      </div>

      {/* © 2026 — top-right corner */}
      <div
        className="hero-animate"
        style={{
          position: "absolute",
          top: "clamp(2.5rem, 6vh, 4.5rem)",
          right: "clamp(2rem, 6vw, 5rem)",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.4)",
          fontWeight: 600,
          zIndex: 3,
        }}
      >
        © 2026
      </div>

      {/* Powered by Forge Studios — bottom-right */}
      <div
        className="hero-animate"
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "clamp(2rem, 6vw, 5rem)",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.4)",
          fontWeight: 600,
          zIndex: 3,
        }}
      >
        Powered by Forge Studios
      </div>
    </section>
  );
}
