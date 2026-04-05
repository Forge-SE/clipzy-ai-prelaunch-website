"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import CinematicSequence, { SectionData } from "./CinematicSequence";
import HeroSection from "./HeroSection";
import WaitlistDrawer from "./WaitlistDrawer";

const sections: SectionData[] = [
  {
    id: "screen-1",
    line: <>You have the <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontWeight: 400 }}>ideas</span> but editing slows you down</>,
    bg: "#FFFFFF",
    color: "#0A0A0A",
  },
  {
    id: "screen-2",
    line: <>Every cut, every caption — all done <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontWeight: 400 }}>manually</span></>,
    bg: "#000000",
    color: "#FFFFFF",
  },
  {
    id: "screen-3",
    line: <>What if you could steal a viral video's <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontWeight: 400 }}>style</span></>,
    bg: "#ff8800",
    color: "#FFFFFF",
  },
  {
    id: "screen-4",
    line: <>Add your footage and get it — <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontWeight: 400 }}>automatically</span></>,
    bg: "#FAFAFA",
    color: "#1A1A1A",
  },
];

export default function ClipzyLanding() {
  const [loading, setLoading] = useState(true);
  const [sequenceDone, setSequenceDone] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sequenceDone) return;

    const heroEls = document.querySelectorAll<HTMLElement>(".hero-animate");
    gsap.fromTo(
      heroEls,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1,
      }
    );
  }, [sequenceDone]);

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${!loading ? "hidden" : ""}`}>
        <div style={{ display: "flex" }}>
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
      </div>

      {/* Cinematic Stage */}
      {!loading && !sequenceDone && (
        <CinematicSequence 
          sections={sections} 
          onComplete={() => setSequenceDone(true)} 
        />
      )}

      {/* Final Hero Section */}
      {sequenceDone && (
        <HeroSection onOpenDrawer={() => setDrawerOpen(true)} />
      )}

      {/* Waitlist Drawer */}
      <WaitlistDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />
    </>
  );
}
