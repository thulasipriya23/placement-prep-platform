import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const HRPrep = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [starForm, setStarForm] = useState({
    situation: "",
    task: "",
    action: "",
    result: "",
  });

  const [targetCompany, setTargetCompany] = useState("General Tech");
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await API.get("/hr-prep/questions");
      if (response.data && response.data.data) {
        setQuestions(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedQuestion(response.data.data[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching HR questions:", err);
    }
  };

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setEvaluation(null);
    setStarForm({
      situation: "",
      task: "",
      action: "",
      result: "",
    });
  };

  const handlePreFillSample = () => {
    if (!selectedQuestion) return;
    setStarForm({
      situation: selectedQuestion.starGuide.situation,
      task: selectedQuestion.starGuide.task,
      action: selectedQuestion.starGuide.action,
      result: selectedQuestion.starGuide.result,
    });
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!selectedQuestion) return;

    const fullResponseText = `Situation: ${starForm.situation}\nTask: ${starForm.task}\nAction: ${starForm.action}\nResult: ${starForm.result}`;

    if (!starForm.action && !starForm.situation) {
      setErrorMsg("Please fill out at least your Situation and Action steps.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setEvaluation(null);

      const response = await API.post("/hr-prep/evaluate", {
        question: selectedQuestion.question,
        userResponse: fullResponseText,
        targetCompany,
      });

      if (response.data && response.data.data) {
        setEvaluation(response.data.data);
      }
    } catch (err) {
      console.error("Evaluation error:", err);
      setErrorMsg("Failed to evaluate response. Please check network or Groq API connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyImproved = () => {
    if (evaluation && evaluation.improvedAnswer) {
      navigator.clipboard.writeText(evaluation.improvedAnswer);
      setCopiedAnswer(true);
      setTimeout(() => setCopiedAnswer(false), 2000);
    }
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
        <Navbar title="HR & Behavioral Prep" />

        <div style={{ padding: isMobile ? "16px" : "24px", maxWidth: "1400px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {/* Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(99, 102, 241, 0.15))",
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
                    background: "rgba(236, 72, 153, 0.2)",
                    color: "#f472b6",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Behavioral & HR Round Trainer
                </span>
                <h1 style={{ fontSize: "28px", fontWeight: "800", marginTop: "10px", marginBottom: "8px", background: "linear-gradient(90deg, #fff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  STAR Method HR & Leadership Prep
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "750px" }}>
                  Structure behavioral responses using Situation, Task, Action, and Result (STAR) framework. Get real-time AI evaluation, corporate polish, and confidence scoring.
                </p>
              </div>

              {/* Live AI Simulator Button & STAR Framework Badge */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => navigate("/interview")}
                  style={{
                    background: "linear-gradient(135deg, #ec4899, #6366f1)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(236, 72, 153, 0.4)",
                  }}
                >
                  🎙 Launch Live AI Interview Simulator ↗
                </button>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    background: "rgba(15, 23, 42, 0.8)",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {[
                    { tag: "S", label: "Situation", color: "#6366f1" },
                    { tag: "T", label: "Task", color: "#38bdf8" },
                    { tag: "A", label: "Action", color: "#10b981" },
                    { tag: "R", label: "Result", color: "#f59e0b" },
                  ].map((item) => (
                    <div key={item.tag} style={{ textAlign: "center" }}>
                      <span style={{ display: "inline-block", width: "22px", height: "22px", borderRadius: "50%", background: item.color, color: "#fff", fontWeight: "800", fontSize: "11px", lineHeight: "22px" }}>
                        {item.tag}
                      </span>
                      <div style={{ fontSize: "9px", color: "#94a3b8", marginTop: "2px" }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Responsive Grid Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "360px 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Left: HR Questions List (Sticky so it fills the screen height as you scroll) */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                position: isMobile ? "static" : "sticky",
                top: "24px",
                maxHeight: isMobile ? "none" : "calc(100vh - 48px)",
                overflowY: "auto",
              }}
            >
              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "16px", color: "#f1f5f9" }}>
                💬 Common Behavioral Questions
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {questions.map((q) => {
                  const isSelected = selectedQuestion && selectedQuestion.id === q.id;
                  return (
                    <div
                      key={q.id}
                      onClick={() => handleSelectQuestion(q)}
                      style={{
                        padding: "14px",
                        borderRadius: "12px",
                        background: isSelected ? "rgba(99, 102, 241, 0.2)" : "rgba(30, 41, 59, 0.5)",
                        border: isSelected ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.05)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ fontSize: "11px", fontWeight: "700", color: "#a5b4fc", textTransform: "uppercase" }}>
                        {q.category}
                      </div>
                      <div style={{ fontWeight: "700", fontSize: "14px", color: "#fff", marginTop: "4px" }}>
                        {q.question}
                      </div>
                      <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "10px", background: "rgba(255,255,255,0.08)", color: "#cbd5e1", padding: "2px 6px", borderRadius: "4px" }}>
                          Universal Corporate Round
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: STAR Answer Builder & AI Evaluator */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {selectedQuestion && (
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#f472b6", fontWeight: "700" }}>
                        Selected Question
                      </span>
                      <h2 style={{ fontSize: "20px", fontWeight: "700", marginTop: "4px" }}>
                        {selectedQuestion.question}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={handlePreFillSample}
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#a5b4fc",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      ✨ Pre-fill STAR Guide
                    </button>
                  </div>

                  {errorMsg && (
                    <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "10px", borderRadius: "8px", fontSize: "13px", marginBottom: "14px" }}>
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleEvaluate} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {/* Target Company Selector */}
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#94a3b8", marginBottom: "4px" }}>
                        Hiring Category
                      </label>
                      <select
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          background: "rgba(30, 41, 59, 0.8)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontSize: "13px",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="Universal Technical & Corporate Hiring">Universal Corporate & Tech Hiring (All Companies)</option>
                        <option value="Product Engineering & Microservices">Product Engineering & Tech MNCs</option>
                        <option value="Enterprise IT Services & Operations">Enterprise IT & Services Companies</option>
                        <option value="High-Growth Tech Startup">High-Growth Tech Startups</option>
                      </select>
                    </div>

                    {/* Situation */}
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#818cf8", marginBottom: "4px" }}>
                        S - Situation (Background context)
                      </label>
                      <textarea
                        rows="2"
                        value={starForm.situation}
                        onChange={(e) => setStarForm({ ...starForm, situation: e.target.value })}
                        placeholder="Describe the specific project, timeframe, or challenge..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(99, 102, 241, 0.2)",
                          color: "#fff",
                          fontSize: "13px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Task */}
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#38bdf8", marginBottom: "4px" }}>
                        T - Task (Goal or responsibility)
                      </label>
                      <textarea
                        rows="2"
                        value={starForm.task}
                        onChange={(e) => setStarForm({ ...starForm, task: e.target.value })}
                        placeholder="What were you tasked to resolve or accomplish?"
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(56, 189, 248, 0.2)",
                          color: "#fff",
                          fontSize: "13px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Action */}
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#10b981", marginBottom: "4px" }}>
                        A - Action (Specific steps YOU took)
                      </label>
                      <textarea
                        rows="3"
                        value={starForm.action}
                        onChange={(e) => setStarForm({ ...starForm, action: e.target.value })}
                        placeholder="Detail the exact technical/behavioral actions YOU implemented..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                          color: "#fff",
                          fontSize: "13px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Result */}
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#f59e0b", marginBottom: "4px" }}>
                        R - Result (Measurable outcome & takeaway)
                      </label>
                      <textarea
                        rows="2"
                        value={starForm.result}
                        onChange={(e) => setStarForm({ ...starForm, result: e.target.value })}
                        placeholder="What was the quantified impact, project completion, or key takeaway?"
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                          color: "#fff",
                          fontSize: "13px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "12px",
                        background: loading ? "#334155" : "linear-gradient(135deg, #ec4899, #6366f1)",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "14px",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                        boxShadow: "0 4px 14px rgba(236, 72, 153, 0.3)",
                        marginTop: "6px",
                      }}
                    >
                      {loading ? "⚡ Groq AI Evaluating Answer..." : "🤖 Evaluate HR Answer with Groq AI"}
                    </button>
                  </form>
                </div>
              )}

              {/* Evaluation Result */}
              {evaluation && (
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid rgba(236, 72, 153, 0.3)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#f472b6", fontWeight: "700" }}>AI Behavioral Feedback</span>
                      <h3 style={{ fontSize: "20px", fontWeight: "800" }}>{evaluation.rating}</h3>
                    </div>

                    <div style={{ fontSize: "28px", fontWeight: "800", color: evaluation.overallScore >= 80 ? "#10b981" : "#f59e0b", background: "rgba(30,41,59,0.7)", padding: "6px 14px", borderRadius: "10px" }}>
                      {evaluation.overallScore}/100
                    </div>
                  </div>

                  {/* STAR Breakdown */}
                  {evaluation.starCompliance && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "16px", textTransform: "capitalize" }}>
                      {Object.entries(evaluation.starCompliance).map(([key, val]) => (
                        <div key={key} style={{ background: "rgba(30,41,59,0.5)", padding: "8px", borderRadius: "6px", textAlign: "center", fontSize: "11px" }}>
                          <div style={{ color: "#94a3b8", textTransform: "uppercase" }}>{key}</div>
                          <div style={{ fontWeight: "700", color: val === "Clear" ? "#10b981" : "#ef4444", marginTop: "2px" }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Strengths & Improvements */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "12px", borderRadius: "8px" }}>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "#10b981", marginBottom: "6px" }}>✅ Key Strengths</div>
                      <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#cbd5e1" }}>
                        {evaluation.strengths?.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ background: "rgba(245, 158, 11, 0.1)", padding: "12px", borderRadius: "8px" }}>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "#f59e0b", marginBottom: "6px" }}>⚠️ Areas to Improve</div>
                      <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#cbd5e1" }}>
                        {evaluation.areasToImprove?.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Improved Corporate Answer */}
                  {evaluation.improvedAnswer && (
                    <div style={{ background: "rgba(30, 41, 59, 0.7)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "#c084fc" }}>✨ Corporate-Polished STAR Answer:</div>
                        <button
                          onClick={handleCopyImproved}
                          style={{ background: copiedAnswer ? "#10b981" : "rgba(192, 132, 252, 0.2)", color: copiedAnswer ? "#fff" : "#c084fc", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}
                        >
                          {copiedAnswer ? "Copied! ✓" : "Copy Answer"}
                        </button>
                      </div>

                      <div style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: "1.6" }}>
                        {evaluation.improvedAnswer}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRPrep;
