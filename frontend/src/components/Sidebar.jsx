import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },

  {
    path: "/company-dna",
    label: "Company DNA",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },

  {
    path: "/dsa-tracker",
    label: "DSA Tracker",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },

  {
    path: "/core-cs",
    label: "Core CS & Aptitude",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },

  {
    path: "/project-analyzer",
    label: "AI Project Defense",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },

  {
    path: "/hr-prep",
    label: "HR & Behavioral Prep",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },



  {
    path: "/analytics",
    label: "Placement Analytics",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },

  {
    path: "/mock-tests",
    label: "Mock Tests",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },

  {
    path: "/resume",
    label: "Resume Analyzer",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    ),
  },

  {
    path: "/interview",
    label: "AI Interview",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, []);

  return (
    <>
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 140,
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "256px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#0d0d1c",
          borderRight: "1px solid #1e1e35",
          zIndex: 150,
          transform: isMobile ? (isOpen ? "translateX(0)" : "translateX(-100%)") : "none",
          transition: "transform 0.3s ease, visibility 0.3s ease",
          overflow: "hidden",
          visibility: isMobile && !isOpen ? "hidden" : "visible",
        }}
      >
      {/* ================= LOGO ================= */}

      <div
        style={{
          height: "76px",
          padding: "0 20px",

          display: "flex",
          alignItems: "center",
          gap: "12px",

          borderBottom: "1px solid #1e1e35",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            flexShrink: 0,

            borderRadius: "12px",

            background:
              "linear-gradient(135deg, #6366f1, #8b5cf6)",

            color: "#ffffff",
            fontSize: "19px",
            fontWeight: 800,

            boxShadow:
              "0 5px 18px rgba(99,102,241,0.35)",
          }}
        >
          P
        </div>

        <div>
          <div
            style={{
              color: "#f8fafc",
              fontSize: "16px",
              fontWeight: 750,
              lineHeight: 1.2,
              letterSpacing: "-0.2px",
            }}
          >
            PlacementPrep
          </div>

          <div
            style={{
              color: "#818cf8",
              fontSize: "12px",
              fontWeight: 600,
              marginTop: "4px",
            }}
          >
            Pro Platform
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION LABEL ================= */}

      <div
        style={{
          padding: "28px 20px 10px",
        }}
      >
        <span
          style={{
            color: "#475569",
            fontSize: "11px",
            fontWeight: 750,

            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
        >
          Navigation
        </span>
      </div>

      {/* ================= NAVIGATION ITEMS ================= */}

      <nav
        style={{
          flex: 1,

          display: "flex",
          flexDirection: "column",
          gap: "6px",

          padding: "4px 12px 20px",

          overflowY: "auto",
        }}
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path === "/mock-tests" &&
              pathname.startsWith("/test"));

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: "none",
                display: "block",
              }}
            >
              <div
                style={{
                  position: "relative",

                  minHeight: "50px",

                  display: "flex",
                  alignItems: "center",

                  gap: "13px",

                  padding: "0 14px",

                  borderRadius: "11px",

                  background: isActive
                    ? "linear-gradient(90deg, rgba(99,102,241,0.18), rgba(99,102,241,0.09))"
                    : "transparent",

                  border: `1px solid ${
                    isActive
                      ? "rgba(99,102,241,0.32)"
                      : "transparent"
                  }`,

                  color: isActive
                    ? "#d5dcff"
                    : "#94a3b8",

                  fontSize: "14px",
                  fontWeight: isActive ? 650 : 500,

                  transition:
                    "background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease",

                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.04)";

                    e.currentTarget.style.color =
                      "#d1d5db";

                    e.currentTarget.style.transform =
                      "translateX(2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      "transparent";

                    e.currentTarget.style.color =
                      "#94a3b8";

                    e.currentTarget.style.transform =
                      "translateX(0)";
                  }
                }}
              >
                {/* ICON */}

                <span
                  style={{
                    width: "22px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    flexShrink: 0,

                    color: isActive
                      ? "#8b8fff"
                      : "inherit",
                  }}
                >
                  {item.icon}
                </span>

                {/* LABEL */}

                <span
                  style={{
                    flex: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>

                {/* ACTIVE DOT */}

                {isActive && (
                  <span
                    style={{
                      width: "6px",
                      height: "6px",

                      flexShrink: 0,

                      borderRadius: "50%",

                      background: "#818cf8",

                      boxShadow:
                        "0 0 10px rgba(129,140,248,0.85)",
                    }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* ================= BOTTOM ================= */}

      <div
        style={{
          padding: "18px 20px 20px",

          borderTop: "1px solid #1e1e35",

          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "11px 12px",

            borderRadius: "10px",

            background: "rgba(99,102,241,0.04)",
            border: "1px solid rgba(99,102,241,0.08)",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontSize: "11px",
              fontWeight: 500,
            }}
          >
            Placement preparation
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: "12px",
              fontWeight: 600,
              marginTop: "3px",
            }}
          >
            Learn • Practice • Improve
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}