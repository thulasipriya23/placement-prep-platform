// ==========================================
// FORCE DNS SERVERS FOR MONGODB ATLAS
// ==========================================
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// ==========================================
// LOAD ENVIRONMENT VARIABLES FIRST
// ==========================================

const dotenv = require("dotenv");
dotenv.config();

// IMPORTANT:
// Nothing that uses GROQ_API_KEY should be imported
// before dotenv.config()

// ==========================================
// PACKAGES
// ==========================================

const express = require("express");
const cors = require("cors");

// ==========================================
// DATABASE
// ==========================================

const connectDB = require("./config/db");

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const progressRoutes = require("./routes/progressRoutes");
const testRoutes = require("./routes/testRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const userRoutes = require("./routes/userRoutes");
const aiDashboardRoutes = require("./routes/aiDashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Company Prep
const companyPrepRoutes = require("./routes/companyPrepRoutes");
const coreCSRoutes = require("./routes/coreCSRoutes");
const projectAnalyzerRoutes = require("./routes/projectAnalyzerRoutes");
const hrPrepRoutes = require("./routes/hrPrepRoutes");
const revisionRoutes = require("./routes/revisionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// ==========================================
// CONNECT DATABASE
// ==========================================

connectDB();

// ==========================================
// EXPRESS APP
// ==========================================

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/problems", problemRoutes);

app.use("/api/dsa", progressRoutes);

app.use("/api/tests", testRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/ai-dashboard", aiDashboardRoutes);

app.use("/api/user", userRoutes);

app.use("/api/ai", aiRoutes);

// Company Prep
app.use("/api/company-prep", companyPrepRoutes);

// Core CS & Aptitude Hub
app.use("/api/core-cs", coreCSRoutes);

// Project Analyzer
app.use("/api/project-analyzer", projectAnalyzerRoutes);

// HR Prep & Behavioral Trainer
app.use("/api/hr-prep", hrPrepRoutes);

// Revision Vault
app.use("/api/revision", revisionRoutes);

// Placement Analytics
app.use("/api/analytics", analyticsRoutes);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello Thulasi Priya, Backend Connected Successfully 🚀",
  });
});

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});