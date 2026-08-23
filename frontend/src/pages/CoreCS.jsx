import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const CoreCS = () => {
  const [activeTab, setActiveTab] = useState("CoreCS"); // CoreCS | SystemDesign | Aptitude
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Quiz Modal State
  const [activeQuizTopic, setActiveQuizTopic] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // AI Explanation Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [aiPromptTitle, setAiPromptTitle] = useState("");

  useEffect(() => {
    fetchTopics();
  }, [activeTab]);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/core-cs/topics?section=${activeTab}`);
      if (response.data && response.data.data) {
        setTopics(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching Core CS topics:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter topics based on sub-category & search
  const filteredTopics = topics.filter((t) => {
    const matchesCategory = activeCategory === "ALL" || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOptionSelect = (qIdx, optIdx) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const handleQuizSubmit = async () => {
    if (!activeQuizTopic) return;
    try {
      const response = await API.post("/core-cs/submit-quiz", {
        topicId: activeQuizTopic._id,
        answers: userAnswers,
      });
      setQuizResult(response.data);
    } catch (err) {
      console.error("Quiz submission error:", err);
    }
  };

  const handleRequestAiExplanation = async (conceptTitle, questionText) => {
    try {
      setAiPromptTitle(conceptTitle || questionText);
      setAiContent("");
      setAiModalOpen(true);
      setAiLoading(true);

      const response = await API.post("/core-cs/ai-explain", {
        concept: conceptTitle,
        question: questionText,
        context: `Section: ${activeTab}, Category: ${activeCategory}`,
      });

      if (response.data && response.data.explanation) {
        setAiContent(response.data.explanation);
      }
    } catch (err) {
      setAiContent("Failed to generate AI explanation. Please check your network or Groq API configuration.");
    } finally {
      setAiLoading(false);
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
        <Navbar title="Core CS & Aptitude" />

        <div style={{ padding: isMobile ? "16px" : "32px", maxWidth: "1400px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {/* Header Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))",
              borderRadius: "20px",
              padding: isMobile ? "20px 16px" : "32px",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span
                  style={{
                    background: "rgba(99, 102, 241, 0.2)",
                    color: "#818cf8",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Campus Placement Master Hub
                </span>
                <h1 style={{ fontSize: "32px", fontWeight: "800", marginTop: "12px", marginBottom: "8px", background: "linear-gradient(90deg, #fff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Core CS, System Design & Aptitude
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "700px" }}>
                  Master OS, DBMS, Networks, OOPs, System Design, and Quantitative & Logical Reasoning with interactive formula cheatsheets, company Q&A, and Groq AI explanations.
                </p>
              </div>

              {/* Search & AI Topic Explainer Bar */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Search or type ANY topic (e.g. Deadlock, B-Tree, Quant formula)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      handleRequestAiExplanation(searchQuery, searchQuery);
                    }
                  }}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "12px",
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(99, 102, 241, 0.4)",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    minWidth: "300px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      handleRequestAiExplanation(searchQuery, searchQuery);
                    }
                  }}
                  style={{
                    background: searchQuery.trim() ? "linear-gradient(135deg, #6366f1, #a855f7)" : "rgba(99, 102, 241, 0.2)",
                    color: searchQuery.trim() ? "#fff" : "#94a3b8",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: searchQuery.trim() ? "0 4px 12px rgba(99, 102, 241, 0.4)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  ⚡ Explain for Interview
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Scrollable on mobile) */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                paddingBottom: "4px",
              }}
            >
              {[
                { key: "CoreCS", label: "💻 Core CS Fundamentals", desc: "OS, DBMS, Networks & OOPs" },
                { key: "SystemDesign", label: "🏗 System Design", desc: "LLD Patterns & HLD Architectures" },
                { key: "Aptitude", label: "🧮 Aptitude & Reasoning", desc: "Quant, Logical, Verbal & Puzzles" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setActiveCategory("ALL");
                  }}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "12px 12px 0 0",
                    background: activeTab === tab.key ? "rgba(99, 102, 241, 0.25)" : "transparent",
                    border: "none",
                    borderBottom: activeTab === tab.key ? "3px solid #6366f1" : "3px solid transparent",
                    color: activeTab === tab.key ? "#fff" : "#94a3b8",
                    fontWeight: activeTab === tab.key ? "700" : "500",
                    fontSize: "15px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div>{tab.label}</div>
                  <div style={{ fontSize: "11px", color: activeTab === tab.key ? "#a5b4fc" : "#64748b", marginTop: "2px" }}>{tab.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Category Filters */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveCategory("ALL")}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                background: activeCategory === "ALL" ? "#6366f1" : "rgba(30, 41, 59, 0.7)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              All Topics
            </button>

            {activeTab === "CoreCS" &&
              ["OS", "DBMS", "CN", "OOPs"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    background: activeCategory === cat ? "#6366f1" : "rgba(30, 41, 59, 0.7)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                >
                  {cat === "OS" ? "Operating Systems" : cat === "DBMS" ? "DBMS & SQL" : cat === "CN" ? "Networks" : "OOPs"}
                </button>
              ))}

            {activeTab === "SystemDesign" &&
              ["LLD", "HLD"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    background: activeCategory === cat ? "#6366f1" : "rgba(30, 41, 59, 0.7)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                >
                  {cat === "LLD" ? "Low Level Design (LLD)" : "High Level Design (HLD)"}
                </button>
              ))}

            {activeTab === "Aptitude" &&
              ["Quant", "Logical", "Verbal"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    background: activeCategory === cat ? "#6366f1" : "rgba(30, 41, 59, 0.7)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                >
                  {cat === "Quant" ? "Quantitative Math" : cat === "Logical" ? "Logical Reasoning" : "Verbal Ability"}
                </button>
              ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
              <div style={{ fontSize: "20px", marginBottom: "12px" }}>⚡ Loading Placement Hub Data...</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {filteredTopics.map((topic) => (
                <div
                  key={topic._id}
                  style={{
                    background: "rgba(15, 23, 42, 0.75)",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Topic Title & Difficulty */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <span
                          style={{
                            background: "rgba(99, 102, 241, 0.2)",
                            color: "#818cf8",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: "700",
                          }}
                        >
                          {topic.category}
                        </span>
                        <span style={{ color: "#64748b", fontSize: "13px" }}>{topic.topic}</span>
                      </div>
                      <h2 style={{ fontSize: "22px", fontWeight: "700", marginTop: "6px" }}>{topic.title}</h2>
                    </div>

                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background:
                          topic.difficulty === "Easy"
                            ? "rgba(16, 185, 129, 0.15)"
                            : topic.difficulty === "Medium"
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(239, 68, 68, 0.15)",
                        color:
                          topic.difficulty === "Easy"
                            ? "#10b981"
                            : topic.difficulty === "Medium"
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    >
                      {topic.difficulty}
                    </span>
                  </div>

                  <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>{topic.summary}</p>

                  {/* Key Concepts List */}
                  {topic.keyConcepts && topic.keyConcepts.length > 0 && (
                    <div style={{ marginBottom: "20px", background: "rgba(30, 41, 59, 0.5)", padding: "16px", borderRadius: "12px" }}>
                      <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#a5b4fc", marginBottom: "10px" }}>📌 Key Concepts & Rules:</h4>
                      <ul style={{ margin: 0, paddingLeft: "20px", color: "#94a3b8", fontSize: "13px", lineHeight: "1.7" }}>
                        {topic.keyConcepts.map((concept, idx) => (
                          <li key={idx}>
                            <span style={{ color: "#e2e8f0" }}>{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Formula Cheatsheets (For Aptitude & Math) */}
                  {topic.formulas && topic.formulas.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#38bdf8", marginBottom: "10px" }}>📐 Formula & Shortcut Cheatsheet:</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                        {topic.formulas.map((form, fIdx) => (
                          <div
                            key={fIdx}
                            style={{
                              background: "rgba(14, 165, 233, 0.1)",
                              border: "1px solid rgba(56, 189, 248, 0.2)",
                              borderRadius: "10px",
                              padding: "14px",
                            }}
                          >
                            <div style={{ fontWeight: "700", fontSize: "13px", color: "#38bdf8" }}>{form.title}</div>
                            <div
                              style={{
                                fontFamily: "monospace",
                                fontSize: "14px",
                                color: "#fff",
                                background: "rgba(15, 23, 42, 0.9)",
                                padding: "6px 10px",
                                borderRadius: "6px",
                                margin: "8px 0",
                              }}
                            >
                              {form.formula}
                            </div>
                            <div style={{ fontSize: "12px", color: "#94a3b8" }}>{form.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Code Snippet (For LLD / SQL / OOPs) */}
                  {topic.codeSnippet && (
                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#a78bfa", marginBottom: "8px" }}>💻 Implementation Code / Pattern:</h4>
                      <pre
                        style={{
                          background: "#090d16",
                          padding: "16px",
                          borderRadius: "10px",
                          overflowX: "auto",
                          color: "#38bdf8",
                          fontSize: "13px",
                          fontFamily: "Fira Code, monospace",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <code>{topic.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Top Company Interview Questions */}
                  {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#f472b6", marginBottom: "10px" }}>💼 Frequently Asked Interview Questions:</h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {topic.interviewQuestions.map((q, qIdx) => (
                          <div
                            key={qIdx}
                            style={{
                              background: "rgba(30, 41, 59, 0.4)",
                              border: "1px solid rgba(255,255,255,0.06)",
                              borderRadius: "10px",
                              padding: "16px",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                              <div style={{ fontWeight: "700", fontSize: "14px", color: "#f8fafc" }}>Q: {q.question}</div>
                              <div style={{ display: "flex", gap: "6px" }}>
                                {q.companies &&
                                  q.companies.map((comp, cIdx) => (
                                    <span
                                      key={cIdx}
                                      style={{
                                        background: "rgba(244, 114, 182, 0.15)",
                                        color: "#f472b6",
                                        fontSize: "10px",
                                        fontWeight: "700",
                                        padding: "2px 8px",
                                        borderRadius: "12px",
                                      }}
                                    >
                                      {comp}
                                    </span>
                                  ))}
                              </div>
                            </div>
                            <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "8px", lineHeight: "1.6" }}>{q.answer}</div>

                            {/* Trigger Groq AI Deep Explanation */}
                            <button
                              onClick={() => handleRequestAiExplanation(topic.title, q.question)}
                              style={{
                                marginTop: "12px",
                                background: "rgba(99, 102, 241, 0.15)",
                                color: "#818cf8",
                                border: "1px solid rgba(99, 102, 241, 0.3)",
                                padding: "6px 12px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              🤖 Request Groq AI Deep Explanation
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practice Quiz Action */}
                  {topic.quizQuestions && topic.quizQuestions.length > 0 && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                      <button
                        onClick={() => {
                          setActiveQuizTopic(topic);
                          setUserAnswers({});
                          setQuizResult(null);
                        }}
                        style={{
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          color: "#fff",
                          padding: "10px 20px",
                          borderRadius: "10px",
                          border: "none",
                          fontWeight: "700",
                          fontSize: "13px",
                          cursor: "pointer",
                          boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                        }}
                      >
                        ⚡ Take Interactive Practice Quiz ({topic.quizQuestions.length} Qs)
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUIZ MODAL */}
      {activeQuizTopic && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#0f172a",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700" }}>📝 Quiz: {activeQuizTopic.title}</h3>
              <button
                onClick={() => setActiveQuizTopic(null)}
                style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "24px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {!quizResult ? (
              <div>
                {activeQuizTopic.quizQuestions.map((q, qIdx) => (
                  <div key={qIdx} style={{ marginBottom: "24px", background: "rgba(30, 41, 59, 0.5)", padding: "18px", borderRadius: "12px" }}>
                    <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "12px" }}>
                      Q{qIdx + 1}: {q.question}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionSelect(qIdx, optIdx)}
                          style={{
                            textAlign: "left",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            background: userAnswers[qIdx] === optIdx ? "rgba(99, 102, 241, 0.3)" : "rgba(15, 23, 42, 0.8)",
                            border: userAnswers[qIdx] === optIdx ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.1)",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(userAnswers).length === 0}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    background: Object.keys(userAnswers).length > 0 ? "linear-gradient(135deg, #10b981, #059669)" : "#334155",
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: "15px",
                    border: "none",
                    cursor: Object.keys(userAnswers).length > 0 ? "pointer" : "not-allowed",
                  }}
                >
                  Submit & Check Score
                </button>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: "center", padding: "20px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "12px", marginBottom: "24px" }}>
                  <div style={{ fontSize: "36px", fontWeight: "800", color: "#10b981" }}>{quizResult.percentage}%</div>
                  <div style={{ fontSize: "16px", color: "#cbd5e1", marginTop: "4px" }}>
                    You scored {quizResult.score} out of {quizResult.total} questions correctly!
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  {quizResult.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        background: item.isCorrect ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                        border: item.isCorrect ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                      }}
                    >
                      <div style={{ fontWeight: "700", fontSize: "14px" }}>
                        {item.isCorrect ? "✅ Correct" : "❌ Incorrect"} — Q{idx + 1}: {item.question}
                      </div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "6px" }}>{item.explanation}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveQuizTopic(null)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    background: "#334155",
                    color: "#fff",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Close Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI EXPLANATION MODAL */}
      {aiModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1100,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#0f172a",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>🤖</span>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700" }}>Groq AI Placement Coach</h3>
                  <div style={{ fontSize: "12px", color: "#818cf8" }}>{aiPromptTitle}</div>
                </div>
              </div>
              <button onClick={() => setAiModalOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "24px", cursor: "pointer" }}>
                ✕
              </button>
            </div>

            {aiLoading ? (
              <div style={{ textAlign: "center", padding: "50px 0", color: "#a5b4fc" }}>
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>⚡ Groq AI is analyzing and generating detailed placement response...</div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>Generating core intuition, technical edge cases, and 30-second interview answer.</div>
              </div>
            ) : (
              <div
                style={{
                  background: "rgba(30, 41, 59, 0.5)",
                  padding: "24px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  whiteSpace: "pre-wrap",
                  color: "#e2e8f0",
                }}
              >
                {aiContent}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoreCS;
