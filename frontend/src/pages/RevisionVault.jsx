import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const RevisionVault = () => {
  const [activeTab, setActiveTab] = useState("NOTES"); // NOTES | BOOKMARKS | REPETITION
  const [notes, setNotes] = useState([]);
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Note Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    category: "DSA",
    tags: "",
    content: "",
    codeSnippet: "",
  });

  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  useEffect(() => {
    fetchVaultData();
  }, []);

  const defaultNotes = [
    {
      _id: "def-1",
      title: "Binary Search Template (Boundary Safe)",
      category: "DSA",
      tags: ["Algorithms", "Binary Search", "Templates"],
      content: "Universal binary search template to avoid infinite loops and find exact bounds.",
      codeSnippet: "let left = 0, right = nums.length - 1;\nwhile (left <= right) {\n  let mid = Math.floor(left + (right - left) / 2);\n  if (nums[mid] === target) return mid;\n  if (nums[mid] < target) left = mid + 1;\n  else right = mid - 1;\n}\nreturn -1;",
      createdAt: new Date().toISOString()
    },
    {
      _id: "def-2",
      title: "SQL GROUP BY & HAVING Cheatsheet",
      category: "Core CS",
      tags: ["DBMS", "SQL", "Formulas"],
      content: "WHERE filters rows before grouping. HAVING filters aggregate groups after GROUP BY execution.",
      codeSnippet: "SELECT department_id, COUNT(*) as total_emp\nFROM employees\nWHERE salary > 50000\nGROUP BY department_id\nHAVING COUNT(*) >= 5;",
      createdAt: new Date().toISOString()
    },
    {
      _id: "def-3",
      title: "STAR Framework Behavioral Formula",
      category: "HR",
      tags: ["HR", "Behavioral", "STAR"],
      content: "60-Second Answer structure: 15s Situation/Task, 35s Specific Actions, 10s Metric Result.",
      codeSnippet: "S/T: Facing high API latency (1.2s) during peak campus placement registration.\nA: Implemented Redis caching & indexed foreign keys.\nR: Cut latency by 90% down to 120ms.",
      createdAt: new Date().toISOString()
    }
  ];

  const displayNotes = notes && notes.length > 0 ? notes : defaultNotes;

  const fetchVaultData = async () => {
    try {
      setLoading(true);
      const response = await API.get("/revision/vault");
      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
        setBookmarkedProblems(response.data.bookmarkedProblems || []);
      }
    } catch (err) {
      console.error("Error fetching revision vault:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;

    try {
      const response = await API.post("/revision/note", newNote);
      if (response.data && response.data.data) {
        setNotes([response.data.data, ...notes]);
        setModalOpen(false);
        setNewNote({ title: "", category: "DSA", tags: "", content: "", codeSnippet: "" });
      }
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await API.delete(`/revision/note/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleCopySnippet = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  // Calculate days elapsed for spaced repetition
  const getDaysAgo = (dateStr) => {
    if (!dateStr) return 0;
    const diffTime = Math.abs(new Date() - new Date(dateStr));
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
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
        <Navbar title="Revision Vault" />

        <div style={{ padding: isMobile ? "16px" : "24px", maxWidth: "1400px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {/* Header Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(99, 102, 241, 0.15))",
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
                    background: "rgba(16, 185, 129, 0.2)",
                    color: "#34d399",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Last-Minute Revision Workspace
                </span>
                <h1 style={{ fontSize: "28px", fontWeight: "800", marginTop: "10px", marginBottom: "8px", background: "linear-gradient(90deg, #fff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Revision Vault & Spaced Repetition
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "750px" }}>
                  Access custom technical notes, formula cards, bookmarked DSA problems, and automated spaced-repetition schedules right before placement interviews.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
                }}
              >
                ✏️ Create New Revision Note
              </button>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: "8px", flexWrap: "wrap" }}>
              {[
                { key: "NOTES", label: "📝 Revision Notes & Formulas", count: notes.length },
                { key: "BOOKMARKS", label: "📌 Bookmarked DSA Problems", count: bookmarkedProblems.length },
                { key: "REPETITION", label: "⏳ Spaced Repetition Schedule", count: notes.filter(n => getDaysAgo(n.lastRevisedAt) >= 5).length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "10px 10px 0 0",
                    background: activeTab === tab.key ? "rgba(16, 185, 129, 0.2)" : "transparent",
                    border: "none",
                    borderBottom: activeTab === tab.key ? "3px solid #10b981" : "3px solid transparent",
                    color: activeTab === tab.key ? "#fff" : "#94a3b8",
                    fontWeight: activeTab === tab.key ? "700" : "500",
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      background: activeTab === tab.key ? "#10b981" : "rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "12px",
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: REVISION NOTES */}
          {activeTab === "NOTES" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {displayNotes.map((note, idx) => {
                const daysAgo = getDaysAgo(note.lastRevisedAt);
                return (
                  <div
                    key={note._id || idx}
                    style={{
                      background: "rgba(15, 23, 42, 0.8)",
                      borderRadius: "16px",
                      padding: "20px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(12px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "#34d399", background: "rgba(16, 185, 129, 0.15)", padding: "2px 8px", borderRadius: "6px" }}>
                          {note.category}
                        </span>

                        <span style={{ fontSize: "11px", color: daysAgo >= 5 ? "#f59e0b" : "#94a3b8" }}>
                          {daysAgo === 0 ? "Revised Today" : `${daysAgo} days ago`}
                        </span>
                      </div>

                      <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "10px", color: "#f8fafc" }}>
                        {note.title}
                      </h3>

                      <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "14px" }}>
                        {note.content}
                      </p>

                      {/* Code Snippet */}
                      {note.codeSnippet && (
                        <div style={{ marginBottom: "14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                            <span style={{ fontSize: "11px", color: "#a5b4fc", fontWeight: "700" }}>Code Snippet</span>
                            <button
                              onClick={() => handleCopySnippet(note.codeSnippet, idx)}
                              style={{ background: "none", border: "none", color: "#38bdf8", fontSize: "11px", cursor: "pointer" }}
                            >
                              {copiedCodeIdx === idx ? "Copied! ✓" : "Copy"}
                            </button>
                          </div>
                          <pre style={{ background: "#090d16", padding: "10px", borderRadius: "8px", color: "#38bdf8", fontSize: "12px", fontFamily: "monospace", overflowX: "auto", margin: 0 }}>
                            <code>{note.codeSnippet}</code>
                          </pre>
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px", marginTop: "12px" }}>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {note.tags &&
                          note.tags.map((t, tIdx) => (
                            <span key={tIdx} style={{ fontSize: "10px", color: "#94a3b8", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px" }}>
                              #{t}
                            </span>
                          ))}
                      </div>

                      {note._id && !note._id.startsWith("sample") && (
                        <button
                          onClick={() => handleDeleteNote(note._id)}
                          style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: BOOKMARKED PROBLEMS */}
          {activeTab === "BOOKMARKS" && (
            <div style={{ background: "rgba(15, 23, 42, 0.8)", borderRadius: "16px", padding: "24px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>📌 Bookmarked Problems Vault</h3>

              {bookmarkedProblems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>📌</div>
                  <div>No DSA problems bookmarked yet.</div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>Go to the DSA Tracker and click the bookmark icon to save problems here for last-minute review!</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {bookmarkedProblems.map((prob) => (
                    <div
                      key={prob._id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                        background: "rgba(30, 41, 59, 0.5)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", fontWeight: "700", color: "#a5b4fc" }}>{prob.topic}</span>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "700",
                              color: prob.difficulty === "Easy" ? "#10b981" : prob.difficulty === "Medium" ? "#f59e0b" : "#ef4444",
                            }}
                          >
                            [{prob.difficulty}]
                          </span>
                        </div>
                        <div style={{ fontWeight: "700", fontSize: "15px", color: "#fff", marginTop: "4px" }}>{prob.title}</div>
                      </div>

                      <a
                        href={prob.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: "rgba(99, 102, 241, 0.2)",
                          color: "#818cf8",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        Solve Problem ↗
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SPACED REPETITION SCHEDULE */}
          {activeTab === "REPETITION" && (
            <div style={{ background: "rgba(15, 23, 42, 0.8)", borderRadius: "16px", padding: "24px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px", color: "#f59e0b" }}>
                ⏳ Spaced Repetition Due Dates
              </h3>

              <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px" }}>
                Based on memory retention research (3-day, 7-day, 14-day intervals), items requiring fresh review are highlighted below:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {notes.map((note, idx) => {
                  const days = getDaysAgo(note.lastRevisedAt);
                  const isDue = days >= 5;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                        background: isDue ? "rgba(245, 158, 11, 0.1)" : "rgba(30, 41, 59, 0.4)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: isDue ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "14px", color: "#fff" }}>{note.title}</div>
                        <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Category: {note.category}</div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            background: isDue ? "rgba(245, 158, 11, 0.2)" : "rgba(16, 185, 129, 0.2)",
                            color: isDue ? "#f59e0b" : "#10b981",
                          }}
                        >
                          {isDue ? "⚡ Review Recommended" : "✅ Fresh Memory"}
                        </span>
                        <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Last revised {days} days ago</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CREATE NOTE MODAL */}
      {modalOpen && (
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
              padding: "28px",
              maxWidth: "600px",
              width: "100%",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700" }}>✏️ Create Revision Note</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "24px", cursor: "pointer" }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNote} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Title *</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="e.g. Sliding Window Pattern Cheatsheet"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Category</label>
                  <select
                    value={newNote.category}
                    onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                  >
                    <option value="DSA">DSA</option>
                    <option value="CoreCS">Core CS</option>
                    <option value="SystemDesign">System Design</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                    placeholder="e.g. Dynamic Programming, Two Pointer"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Revision Summary & Key Takeaways *</label>
                <textarea
                  rows="3"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Summary of core formulas, rules, or key steps to remember..."
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Optional Code Snippet</label>
                <textarea
                  rows="2"
                  value={newNote.codeSnippet}
                  onChange={(e) => setNewNote({ ...newNote, codeSnippet: e.target.value })}
                  placeholder="Key lines of code or SQL query..."
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#38bdf8", fontSize: "13px", fontFamily: "monospace", boxSizing: "border-box" }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "6px",
                }}
              >
                Save Note to Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevisionVault;
