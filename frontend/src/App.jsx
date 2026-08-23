import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import DsaTracker from "./pages/DsaTracker";
import MockTests from "./pages/MockTests";
import TestScreen from "./pages/TestScreen";
import CompanyDNA from "./pages/CompanyDNA";
import CoreCS from "./pages/CoreCS";
import ProjectAnalyzer from "./pages/ProjectAnalyzer";
import HRPrep from "./pages/HRPrep";

import PlacementAnalytics from "./pages/PlacementAnalytics";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewSimulator from "./pages/InterviewSimulator";

function App() {
  const { user, loading } = useAuth();

  // Wait until authentication state is checked
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0b0b15",
          color: "white",
          fontSize: "22px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      {/* Login */}
      <Route
        path="/login"
        element={
          !user ? (
            <Login />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          !user ? (
            <Register />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      {/* ================= PROTECTED ROUTES ================= */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* DSA Tracker */}
      <Route
        path="/dsa-tracker"
        element={
          <ProtectedRoute>
            <DsaTracker />
          </ProtectedRoute>
        }
      />

      {/* Mock Tests */}
      <Route
        path="/mock-tests"
        element={
          <ProtectedRoute>
            <MockTests />
          </ProtectedRoute>
        }
      />

      {/* Test Screen */}
      <Route
        path="/test"
        element={
          <ProtectedRoute>
            <TestScreen />
          </ProtectedRoute>
        }
      />

      {/* Company DNA */}
      <Route
        path="/company-dna"
        element={
          <ProtectedRoute>
            <CompanyDNA />
          </ProtectedRoute>
        }
      />

      {/* Core CS & Aptitude */}
      <Route
        path="/core-cs"
        element={
          <ProtectedRoute>
            <CoreCS />
          </ProtectedRoute>
        }
      />

      {/* AI Project Defense */}
      <Route
        path="/project-analyzer"
        element={
          <ProtectedRoute>
            <ProjectAnalyzer />
          </ProtectedRoute>
        }
      />

      {/* HR & Behavioral Prep */}
      <Route
        path="/hr-prep"
        element={
          <ProtectedRoute>
            <HRPrep />
          </ProtectedRoute>
        }
      />



      {/* Placement Analytics */}
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <PlacementAnalytics />
          </ProtectedRoute>
        }
      />

      {/* Resume Analyzer */}
      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <ResumeAnalyzer />
          </ProtectedRoute>
        }
      />

      {/* AI Interview */}
      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewSimulator />
          </ProtectedRoute>
        }
      />

      {/* ================= DEFAULT ROUTES ================= */}

      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Invalid URL */}
      <Route
        path="*"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;