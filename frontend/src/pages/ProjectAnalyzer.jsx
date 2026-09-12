import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const ProjectAnalyzer = () => {
  const [formData, setFormData] = useState({
    title: "",
    githubUrl: "",
    techStack: "",
    description: "",
    keyFeatures: "",
  });

  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedBulletIdx, setCopiedBulletIdx] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSampleProjectLoad = () => {
    setFormData({
      title: "PlacementPrep Platform",
      githubUrl: "https://github.com/thulasipriya23/placement-prep-platform",
      techStack: "React.js, Node.js, Express, MongoDB, Groq AI SDK, JWT, Vite",
      description:
        "Full-stack placement readiness platform combining DSA tracking, mock assessment engine, ATS resume analysis, and real-time AI interview simulation.",
      keyFeatures:
        "JWT Auth, PRI Index score engine, Groq AI LLM integration, PDF parsing, company blueprints, responsive glassmorphism UI.",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setErrorMsg("Please fill in Project Title and Description.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setAnalysisResult(null);

      const response = await API.post("/project-analyzer/analyze", formData);

      if (response.data && response.data.data) {
        setAnalysisResult(response.data.data);
      }
    } catch (err) {
      console.error("Project analysis error:", err);
      setErrorMsg("Failed to analyze project. Please check backend connection or Groq API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", background: "#0b0b15", minHeight: "100vh", color: "#f8fafc" }}>
      <Sidebar />

      <div style={{ flex: 1, marginLeft: isMobile ? "0" : "256px", display: "flex", flexDirection: "column", minWidth: 0, transition: "margin-left 0.3s ease" }}>
        <Navbar title="AI Project Defense" />

        <div style={{ padding: isMobile ? "16px" : "24px", maxWidth: "1400px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {/* Header Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15))",
              borderRadius: "20px",
              padding: isMobile ? "20px 16px" : "28px",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span
                  style={{
                    background: "rgba(168, 85, 247, 0.2)",
                    color: "#c084fc",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Technical Interview Defense Engine
                </span>
                <h1 style={{ fontSize: "28px", fontWeight: "800", marginTop: "10px", marginBottom: "8px", background: "linear-gradient(90deg, #fff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  AI Project Analyzer & Technical Defense
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "750px" }}>
                  Submit your project details to get company-grade technical defense questions, architecture bottleneck reviews, and AI-optimized resume bullet points.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSampleProjectLoad}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#cbd5e1",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                ✨ Load PlacementPrep Sample Project
              </button>
            </div>
          </div>          {/* Main Content Layout */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Input Form Section */}
            {(!analysisResult || loading) && (
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.85)",
                  borderRadius: "20px",
                  padding: isMobile ? "20px" : "32px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#f1f5f9" }}>
                    🛠 Project Technical Profile & Architecture
                  </h3>
                  <span style={{ fontSize: "12px", color: "#a855f7", fontWeight: "600" }}>
                    Step 1 of 2: Define Architecture
                  </span>
                </div>

                {errorMsg && (
                  <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "12px", borderRadius: "10px", fontSize: "13px", marginBottom: "16px" }}>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Grid 2 Columns for Inputs */}
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#94a3b8", marginBottom: "6px" }}>
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. E-Commerce Microservices Platform"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#94a3b8", marginBottom: "6px" }}>
                        GitHub Repository URL (Optional)
                      </label>
                      <input
                        type="text"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        placeholder="https://github.com/username/project"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#94a3b8", marginBottom: "6px" }}>
                      Tech Stack & Libraries Used
                    </label>
                    <input
                      type="text"
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleChange}
                      placeholder="e.g. React.js, Node.js, Express, MongoDB, Redis, Docker, AWS S3"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        background: "rgba(30, 41, 59, 0.7)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#94a3b8", marginBottom: "6px" }}>
                        Project Overview & System Description *
                      </label>
                      <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe what the project does, key API workflows, data handling, and main purpose..."
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: "10px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#94a3b8", marginBottom: "6px" }}>
                        Key Features & Technical Challenges (Optional)
                      </label>
                      <textarea
                        name="keyFeatures"
                        rows="4"
                        value={formData.keyFeatures}
                        onChange={handleChange}
                        placeholder="e.g. Implemented JWT auth, WebSocket real-time updates, Redis caching, Nginx load balancing..."
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: "10px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "12px",
                      background: loading ? "#334155" : "linear-gradient(135deg, #a855f7, #3b82f6)",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "16px",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: "0 6px 20px rgba(168, 85, 247, 0.4)",
                      marginTop: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {loading ? "⚡ Groq AI Evaluating Technical Architecture..." : "🚀 Analyze Project & Generate Technical Defense Q&A"}
                  </button>
                </form>
              </div>
            )}

            {/* Analysis Output Section (Centered & Full-Width) */}
            {analysisResult && !loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
                {/* Header Action Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#f8fafc" }}>
                    🎯 Project Technical Defense Evaluation
                  </h2>

                  <button
                    onClick={() => setAnalysisResult(null)}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#a5b4fc",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit Inputs / Analyze Another Project
                  </button>
                </div>

                {/* Architecture Rating Banner */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    borderRadius: "20px",
                    padding: "24px 28px",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <span style={{ color: "#c084fc", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Architecture Health Rating
                      </span>
                      <h2 style={{ fontSize: "24px", fontWeight: "800", marginTop: "4px", color: "#fff" }}>{analysisResult.verdict}</h2>
                    </div>

                    <div
                      style={{
                        fontSize: "32px",
                        fontWeight: "800",
                        color: analysisResult.architectureRating >= 80 ? "#10b981" : "#f59e0b",
                        background: "rgba(30, 41, 59, 0.8)",
                        padding: "10px 22px",
                        borderRadius: "14px",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {analysisResult.architectureRating}/100
                    </div>
                  </div>

                  <p style={{ color: "#cbd5e1", fontSize: "14px", marginTop: "14px", lineHeight: "1.6" }}>
                    {analysisResult.summary}
                  </p>
                </div>

                {/* 2-Column Responsive Results Grid */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px", alignItems: "start" }}>
                  {/* Left Column: Expected Interview Defense Questions */}
                  <div
                    style={{
                      background: "rgba(15, 23, 42, 0.85)",
                      borderRadius: "20px",
                      padding: "24px",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                      💼 Expected Interview Defense Questions ({analysisResult.defenseQuestions?.length || 0})
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {analysisResult.defenseQuestions?.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          style={{
                            background: "rgba(30, 41, 59, 0.6)",
                            border: "1px solid rgba(56, 189, 248, 0.25)",
                            borderRadius: "14px",
                            padding: "18px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "8px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#38bdf8", background: "rgba(56, 189, 248, 0.15)", padding: "3px 10px", borderRadius: "6px" }}>
                              {q.category}
                            </span>
                          </div>

                          <div style={{ fontWeight: "700", fontSize: "15px", color: "#f8fafc" }}>
                            Q{qIdx + 1}: {q.question}
                          </div>

                          <div style={{ marginTop: "12px", background: "rgba(15, 23, 42, 0.8)", padding: "14px", borderRadius: "10px", borderLeft: "4px solid #10b981" }}>
                            <div style={{ fontSize: "12px", fontWeight: "700", color: "#10b981", marginBottom: "4px" }}>✅ Recommended Technical Answer:</div>
                            <div style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5" }}>{q.suggestedAnswer}</div>
                          </div>

                          {q.interviewerTip && (
                            <div style={{ marginTop: "10px", fontSize: "12px", color: "#f59e0b", fontStyle: "italic", background: "rgba(245, 158, 11, 0.08)", padding: "8px 12px", borderRadius: "6px" }}>
                              💡 Interviewer Tip: {q.interviewerTip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: AI Resume Bullets, Tech Stack Evaluation & Bottlenecks */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Resume Bullets */}
                    {analysisResult.resumeBulletImprovements && (
                      <div
                        style={{
                          background: "rgba(15, 23, 42, 0.85)",
                          borderRadius: "20px",
                          padding: "24px",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#c084fc", marginBottom: "18px" }}>
                          📄 AI-Enhanced Resume Bullet Points
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {analysisResult.resumeBulletImprovements.map((bullet, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "12px",
                                background: "rgba(30, 41, 59, 0.6)",
                                padding: "14px 18px",
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.05)",
                              }}
                            >
                              <div style={{ fontSize: "13px", color: "#e2e8f0", flex: 1, lineHeight: "1.5" }}>• {bullet}</div>

                              <button
                                onClick={() => handleCopyBullet(bullet, idx)}
                                style={{
                                  background: copiedBulletIdx === idx ? "#10b981" : "rgba(168, 85, 247, 0.2)",
                                  color: copiedBulletIdx === idx ? "#fff" : "#c084fc",
                                  border: "none",
                                  padding: "8px 14px",
                                  borderRadius: "8px",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  cursor: "pointer",
                                  flexShrink: 0,
                                }}
                              >
                                {copiedBulletIdx === idx ? "Copied! ✓" : "Copy"}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Assessment */}
                    {analysisResult.techStackEvaluation && analysisResult.techStackEvaluation.length > 0 && (
                      <div
                        style={{
                          background: "rgba(15, 23, 42, 0.85)",
                          borderRadius: "20px",
                          padding: "24px",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#a855f7", marginBottom: "18px" }}>
                          ⚙️ Tech Stack Architecture Assessment
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {analysisResult.techStackEvaluation.map((item, idx) => (
                            <div
                              key={idx}
                              style={{
                                background: "rgba(30, 41, 59, 0.6)",
                                padding: "14px 18px",
                                borderRadius: "12px",
                                border: "1px solid rgba(168, 85, 247, 0.2)",
                              }}
                            >
                              <div style={{ fontSize: "13px", fontWeight: "700", color: "#c084fc" }}>
                                {item.tech}
                              </div>
                              <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px", lineHeight: "1.5" }}>
                                {item.feedback}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scalability Bottlenecks */}
                    {analysisResult.scalabilityBottlenecks && analysisResult.scalabilityBottlenecks.length > 0 && (
                      <div
                        style={{
                          background: "rgba(15, 23, 42, 0.85)",
                          borderRadius: "20px",
                          padding: "24px",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                        }}
                      >
                        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fbbf24", marginBottom: "16px" }}>
                          ⚠️ Potential Scaling & Architecture Bottlenecks
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {analysisResult.scalabilityBottlenecks.map((bottleneck, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                background: "rgba(245, 158, 11, 0.08)",
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "1px solid rgba(245, 158, 11, 0.2)",
                                color: "#fef08a",
                                fontSize: "13px",
                              }}
                            >
                              <span>⚡</span>
                              <span>{bottleneck}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalyzer;
