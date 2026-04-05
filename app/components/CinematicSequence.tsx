"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface SectionData {
  id: string;
  line: React.ReactNode;
  bg: string;
  color: string;
}

interface CinematicSequenceProps {
  sections: SectionData[];
  onComplete: () => void;
}

export default function CinematicSequence({ sections, onComplete }: CinematicSequenceProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    document.body.style.overflow = "hidden";

    const bgLayer = stage.querySelector<HTMLElement>(".stage-bg");
    const allScreens = stage.querySelectorAll<HTMLElement>(".cinema-screen");

    const master = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    master.to({}, { duration: 0.4 });

    allScreens.forEach((screen, sIndex) => {
      const line = screen.querySelector<HTMLElement>(".cinema-line");
      const sData = sections[sIndex];

      master.to(
        bgLayer!,
        {
          backgroundColor: sData.bg,
          duration: 0.5,
          ease: "power2.inOut",
        },
        `s${sIndex}`
      );

      master.set(screen, { display: "flex" }, `s${sIndex}`);

      master.fromTo(
        line!,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        `s${sIndex}+=0.3`
      );

      master.to({}, { duration: 1.8 }, `s${sIndex}+=0.9`);

      master.to(
        line!,
        {
          opacity: 0,
          y: -15,
          duration: 0.35,
          ease: "power2.in",
        },
        `>`
      );

      master.set(screen, { display: "none" });
    });

    return () => {
      master.kill();
      document.body.style.overflow = "";
    };
  }, [sections, onComplete]);

  return (
    <div ref={stageRef} style={{ position: "fixed", inset: 0, zIndex: 50 }}>
      <div
        className="stage-bg"
        style={{ position: "absolute", inset: 0, backgroundColor: "#FFFFFF" }}
      />
      {sections.map((section) => (
        <div
          key={section.id}
          className="cinema-screen"
          style={{
            position: "absolute",
            inset: 0,
            display: "none",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "clamp(3rem, 8vh, 6rem) clamp(2rem, 6vw, 5rem)",
            zIndex: 2,
          }}
        >
          <div
            className="cinema-line"
            style={{
              fontFamily: "'NeueAlte', system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.2,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: section.color,
              maxWidth: "700px",
              opacity: 0,
            }}
          >
            {section.line}
          </div>
        </div>
      ))}
    </div>
  );
}
