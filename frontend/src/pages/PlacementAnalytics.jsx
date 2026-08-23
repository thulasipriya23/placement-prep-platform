import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const PlacementAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedPlanDays, setCompletedPlanDays] = useState({});

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const fetchDiagnostics = async () => {
    try {
      setLoading(true);
      const response = await API.get("/analytics/diagnostics");
      if (response.data) {
        setData(response.data);
      }
    } catch (err) {
      console.error("Error fetching analytics diagnostics:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDayComplete = (dayIdx) => {
    setCompletedPlanDays((prev) => ({
      ...prev,
      [dayIdx]: !prev[dayIdx],
    }));
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
        <Navbar title="Placement Analytics" />

        <div style={{ padding: isMobile ? "16px" : "24px", maxWidth: "1400px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {/* Header Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(236, 72, 153, 0.15))",
              borderRadius: "20px",
              padding: "28px",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              marginBottom: "28px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span
                  style={{
                    background: "rgba(245, 158, 11, 0.2)",
                    color: "#fbbf24",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Diagnostic Performance Engine
                </span>
                <h1 style={{ fontSize: "28px", fontWeight: "800", marginTop: "10px", marginBottom: "8px", background: "linear-gradient(90deg, #fff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Placement Analytics & AI Weakness Finder
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "750px" }}>
                  Deep-dive diagnostic analysis across DSA, Core CS, Aptitude, System Design, and AI Interviews. AI-generated 7-day action plan tailored to your weak areas.
                </p>
              </div>

              <button
                onClick={fetchDiagnostics}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#f1f5f9",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                🔄 Refresh AI Diagnostics
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
              <div style={{ fontSize: "20px", marginBottom: "12px" }}>⚡ Groq AI Analyzing Diagnostics...</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {/* Stat Summary Cards Grid (Fully Responsive) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "18px",
                }}
              >
                <div style={{ background: "rgba(15, 23, 42, 0.8)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>Solved DSA Problems</div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "#6366f1", marginTop: "6px" }}>{data?.stats?.solvedCount || 0}</div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Target: 150 problems</div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.8)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>Avg Mock Test Score</div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "#10b981", marginTop: "6px" }}>{data?.stats?.avgTestScore || 0}%</div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Across timed assessments</div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.8)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>AI Mock Interview Score</div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "#ec4899", marginTop: "6px" }}>{data?.stats?.avgInterviewScore || 0}%</div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Technical & Behavioral rounds</div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.8)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>Diagnostic Rating</div>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#f59e0b", marginTop: "6px" }}>
                    {data?.stats?.solvedCount > 30 ? "Ready" : "Developing"}
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Placement Readiness Index</div>
                </div>
              </div>

              {/* Subject Skill Mastery Breakdown */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.8)",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px", color: "#f8fafc" }}>
                  📊 Subject Skill Mastery Breakdown
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {data?.radarData?.map((item, idx) => (
                    <div key={idx}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                        <span style={{ color: "#e2e8f0" }}>{item.subject}</span>
                        <span style={{ color: item.score >= 75 ? "#10b981" : item.score >= 50 ? "#f59e0b" : "#ef4444" }}>
                          {item.score}%
                        </span>
                      </div>

                      <div style={{ height: "10px", background: "rgba(30, 41, 59, 0.8)", borderRadius: "10px", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${item.score}%`,
                            background:
                              item.score >= 75
                                ? "linear-gradient(90deg, #10b981, #059669)"
                                : item.score >= 50
                                ? "linear-gradient(90deg, #f59e0b, #d97706)"
                                : "linear-gradient(90deg, #ef4444, #dc2626)",
                            borderRadius: "10px",
                            transition: "width 0.8s ease-in-out",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Weakness & Strengths Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "24px",
                }}
              >
                {/* Critical Weak Spots */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#ef4444", marginBottom: "16px" }}>
                    ⚠️ Groq AI Identified Weak Spots
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {data?.aiPlan?.weakSpots?.map((w, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "rgba(239, 68, 68, 0.08)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          padding: "16px",
                          borderRadius: "12px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: "700", fontSize: "14px", color: "#f8fafc" }}>{w.area}</span>
                          <span style={{ fontSize: "10px", fontWeight: "700", color: "#ef4444", background: "rgba(239, 68, 68, 0.2)", padding: "2px 8px", borderRadius: "4px" }}>
                            {w.severity} Severity
                          </span>
                        </div>
                        <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "8px" }}>💡 {w.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Strengths */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#10b981", marginBottom: "16px" }}>
                    ✅ Verified Core Strengths
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {data?.aiPlan?.strengths?.map((str, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "rgba(16, 185, 129, 0.08)",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                          padding: "14px",
                          borderRadius: "12px",
                          fontSize: "13px",
                          color: "#e2e8f0",
                        }}
                      >
                        • {str}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Groq AI 7-Day Recommended Action Plan */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.85)",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fbbf24", marginBottom: "16px" }}>
                  📅 Groq AI 7-Day Recommended Action Plan
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                  {data?.aiPlan?.dailyPlan?.map((plan, idx) => {
                    const isDone = completedPlanDays[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleDayComplete(idx)}
                        style={{
                          background: isDone ? "rgba(16, 185, 129, 0.15)" : "rgba(30, 41, 59, 0.6)",
                          border: isDone ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.08)",
                          padding: "18px",
                          borderRadius: "14px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: "800", color: "#fbbf24" }}>{plan.day}</span>
                          <span style={{ fontSize: "12px", color: isDone ? "#10b981" : "#94a3b8" }}>
                            {isDone ? "Completed ✓" : "Tap to complete"}
                          </span>
                        </div>

                        <div style={{ fontWeight: "700", fontSize: "15px", color: "#fff", marginBottom: "8px" }}>
                          {plan.focus}
                        </div>

                        <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#cbd5e1", lineHeight: "1.5" }}>
                          {plan.tasks?.map((t, tIdx) => (
                            <li key={tIdx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacementAnalytics;
