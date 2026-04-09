"use client";

import { useState } from "react";

const LIME = "#ff8800";

interface WaitlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistDrawer({ isOpen, onClose }: WaitlistDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    experience: "",
    struggle: "",
    features: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert(data.error || "Failed to join waitlist");
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    if (isSuccess) {
      setIsSuccess(false);
      setFormData({ name: "", email: "", category: "", experience: "", struggle: "", features: "" });
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 99,
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#fff",
          zIndex: 100,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'NeueAlte', system-ui, sans-serif",
          color: "#1A1A1A",
        }}
      >
        <div style={{ padding: "2rem", borderBottom: "1px solid #EAEAEA", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600, letterSpacing: "-0.02em" }}>Join Early Access</h2>
          <button onClick={handleClose} style={{ background: "none", border: "none", fontSize: "2rem", cursor: "pointer", color: "#1A1A1A", lineHeight: 1 }}>&times;</button>
        </div>

        <div style={{ padding: "2rem", overflowY: "auto", flex: 1, backgroundColor: "#FCFCFC" }}>
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1A1A1A" }}>You're on the list!</h3>
              <p style={{ color: "rgba(0,0,0,0.6)", marginTop: "1rem", lineHeight: 1.6 }}>We'll notify you as soon as Clipzy AI is ready for early access.</p>
              <button
                onClick={handleClose}
                style={{ marginTop: "2rem", padding: "0.8rem 2rem", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(0,0,0,0.6)" }}>NAME *</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "0.8rem", border: "1px solid #EAEAEA", borderRadius: "4px", fontSize: "0.95rem", color: "#1A1A1A", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(0,0,0,0.6)" }}>EMAIL *</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", padding: "0.8rem", border: "1px solid #EAEAEA", borderRadius: "4px", fontSize: "0.95rem", color: "#1A1A1A", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(0,0,0,0.6)" }}>WHO ARE YOU? *</label>
                <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", padding: "0.8rem", border: "1px solid #EAEAEA", borderRadius: "4px", backgroundColor: "#fff", fontSize: "0.95rem", color: "#1A1A1A", outline: "none", WebkitAppearance: "none" }}>
                  <option value="">Select category...</option>
                  <option value="creator">Content Creator</option>
                  <option value="business">Business Owner</option>
                  <option value="agency">Agency / Freelancer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(0,0,0,0.6)" }}>EXPERIENCE LEVEL</label>
                <select value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} style={{ width: "100%", padding: "0.8rem", border: "1px solid #EAEAEA", borderRadius: "4px", backgroundColor: "#fff", fontSize: "0.95rem", color: "#1A1A1A", outline: "none" }}>
                  <option value="">Select experience...</option>
                  <option value="beginner">Beginner (No experience)</option>
                  <option value="intermediate">Intermediate (Capcut, basics)</option>
                  <option value="pro">Pro (Premiere, Final Cut)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(0,0,0,0.6)" }}>STRUGGLE WITH EDITING?</label>
                <select value={formData.struggle} onChange={(e) => setFormData({ ...formData, struggle: e.target.value })} style={{ width: "100%", padding: "0.8rem", border: "1px solid #EAEAEA", borderRadius: "4px", backgroundColor: "#fff", fontSize: "0.95rem", color: "#1A1A1A", outline: "none" }}>
                  <option value="">Select...</option>
                  <option value="yes">Yes, it takes me way too long</option>
                  <option value="sometimes">Sometimes it's tedious</option>
                  <option value="no">No, I edit fast</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(0,0,0,0.6)" }}>WHAT FEATURES DO YOU WANT MOST?</label>
                <textarea rows={3} value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} placeholder="E.g. Auto b-roll, trending transitions..." style={{ width: "100%", padding: "0.8rem", border: "1px solid #EAEAEA", borderRadius: "4px", resize: "vertical", fontSize: "0.95rem", color: "#1A1A1A", outline: "none" }} />
              </div>

              <button disabled={isSubmitting} type="submit" style={{ marginTop: "1rem", backgroundColor: LIME, color: "#1A1A1A", padding: "1.1rem", border: "none", borderRadius: "4px", fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.05em", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1, transition: "opacity 0.2s ease" }}>
                {isSubmitting ? "PROCESSING..." : "JOIN WAITLIST"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
