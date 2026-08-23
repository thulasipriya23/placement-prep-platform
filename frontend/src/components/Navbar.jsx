import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  // Display a cleaner version of the user's name in navbar
  const displayName = user?.name
    ? user.name
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    : "My Account";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/login");
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
    <header
      style={{
        height: isMobile ? "62px" : "76px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 14px" : "0 34px",
        background: "rgba(13, 13, 28, 0.96)",
        borderBottom: "1px solid #1e1e35",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* ================= MOBILE MENU TOGGLE ================= */}
      {isMobile && (
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
          style={{
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "10px",
            padding: "6px 12px",
            fontSize: "13px",
            fontWeight: "750",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(99,102,241,0.35)",
          }}
        >
          ☰ Menu
        </button>
      )}

      {/* ================= TITLE ================= */}

      <div style={{ flex: 1, minWidth: 0, margin: isMobile ? "0 10px" : 0 }}>
        <h1
          style={{
            fontSize: isMobile ? "15px" : "21px",
            fontWeight: 750,
            color: "#f8fafc",
            margin: 0,
            letterSpacing: "-0.4px",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {title}
        </h1>

        {!isMobile && (
          <p
            style={{
              fontSize: "13px",
              color: "#64748b",
              margin: "5px 0 0",
              fontWeight: 450,
            }}
          >
            {today}
          </p>
        )}
      </div>

      {/* ================= RIGHT ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* ================= PROFILE ================= */}

        <div
          ref={profileRef}
          style={{
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            style={{
              minHeight: "50px",

              display: "flex",
              alignItems: "center",
              gap: "11px",

              padding: "4px 12px 4px 5px",

              borderRadius: "13px",

              border: profileOpen
                ? "1px solid rgba(99,102,241,0.35)"
                : "1px solid transparent",

              background: profileOpen
                ? "rgba(99,102,241,0.09)"
                : "transparent",

              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!profileOpen) {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.04)";
              }
            }}
            onMouseLeave={(e) => {
              if (!profileOpen) {
                e.currentTarget.style.background =
                  "transparent";
              }
            }}
          >
            {/* Avatar */}

            <div
              style={{
                width: "42px",
                height: "42px",

                borderRadius: "50%",

                background:
                  "linear-gradient(135deg, #6366f1, #8b5cf6)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: "14px",
                fontWeight: 750,
                color: "#ffffff",

                boxShadow:
                  "0 4px 14px rgba(99,102,241,0.3)",

                flexShrink: 0,
              }}
            >
              {initials}
            </div>

            {/* User Details (Desktop only) */}
            {!isMobile && (
              <div
                style={{
                  textAlign: "left",
                  minWidth: "120px",
                }}
              >
                <div
                  style={{
                    color: "#f1f5f9",
                    fontSize: "14px",
                    fontWeight: 650,
                    lineHeight: 1.3,
                    maxWidth: "160px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {displayName}
                </div>

                <div
                  style={{
                    color: "#818cf8",
                    fontSize: "11.5px",
                    fontWeight: 550,
                    marginTop: "3px",
                    lineHeight: 1.2,
                  }}
                >
                  My Account
                </div>
              </div>
            )}

            {/* Arrow */}

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke={profileOpen ? "#a5b4fc" : "#64748b"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                marginLeft: "2px",

                transform: profileOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",

                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* ================= PROFILE DROPDOWN ================= */}

          {profileOpen && (
            <div
              style={{
                position: "absolute",

                right: 0,
                top: "60px",

                width: "310px",

                background: "#111122",

                border: "1px solid #25253d",
                borderRadius: "16px",

                boxShadow:
                  "0 24px 60px rgba(0,0,0,0.5)",

                overflow: "hidden",

                zIndex: 100,
              }}
            >
              {/* Account Header */}

              <div
                style={{
                  padding: "20px",

                  display: "flex",
                  alignItems: "center",
                  gap: "14px",

                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.09), rgba(139,92,246,0.04))",

                  borderBottom: "1px solid #1e1e35",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",

                    borderRadius: "50%",

                    background:
                      "linear-gradient(135deg, #6366f1, #8b5cf6)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    color: "#ffffff",

                    fontSize: "16px",
                    fontWeight: 750,

                    boxShadow:
                      "0 5px 16px rgba(99,102,241,0.3)",

                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>

                <div
                  style={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      color: "#f8fafc",
                      fontSize: "16px",
                      fontWeight: 700,

                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {displayName}
                  </div>

                  <div
                    style={{
                      color: "#818cf8",
                      fontSize: "12px",
                      fontWeight: 550,
                      marginTop: "4px",
                    }}
                  >
                    PlacementPrep Account
                  </div>
                </div>
              </div>

              {/* Account Information */}

              <div
                style={{
                  padding: "18px 20px 20px",
                }}
              >
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "10.5px",
                    fontWeight: 700,

                    textTransform: "uppercase",
                    letterSpacing: "0.9px",

                    marginBottom: "8px",
                  }}
                >
                  Email Address
                </div>

                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: "13px",
                    fontWeight: 500,

                    padding: "11px 12px",

                    background: "rgba(255,255,255,0.025)",

                    border: "1px solid #1e1e35",
                    borderRadius: "9px",

                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user?.email || "No email available"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider (Desktop only) */}
        {!isMobile && (
          <div
            style={{
              height: "34px",
              width: "1px",
              background: "#25253b",
            }}
          />
        )}

        {/* ================= LOGOUT ================= */}
        <button
          type="button"
          onClick={handleLogout}
          style={{
            height: isMobile ? "36px" : "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: isMobile ? "0 10px" : "0 16px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.015)",
            border: "1px solid #25253b",
            color: "#94a3b8",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(244,63,94,0.08)";
            e.currentTarget.style.borderColor =
              "rgba(244,63,94,0.28)";
            e.currentTarget.style.color = "#fda4af";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.015)";
            e.currentTarget.style.borderColor = "#25253b";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>

          {!isMobile && "Logout"}
        </button>
      </div>
    </header>
  );
}