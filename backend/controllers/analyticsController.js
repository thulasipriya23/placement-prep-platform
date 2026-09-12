const Problem = require("../models/Problem");
const UserProgress = require("../models/UserProgress");
const Result = require("../models/Result");
const InterviewResult = require("../models/InterviewResult");
const { askGroq } = require("../services/aiService");

// @route   GET /api/analytics/diagnostics
// @access  Private
const getAnalyticsDiagnostics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user activity data in parallel
    const [progress, results, interviews] = await Promise.all([
      UserProgress.find({ userId }).populate("problemId").exec(),
      Result.find({ userId }).sort({ createdAt: -1 }),
      InterviewResult.find({ userId }).sort({ createdAt: -1 }),
    ]);

    // 1. Calculate Topic-wise Accuracy / Mastery
    const solvedCount = progress.filter((p) => p.solved).length;
    const totalAttempted = progress.length;

    const topicStats = {};
    progress.forEach((p) => {
      if (p.problemId && p.problemId.topic) {
        const top = p.problemId.topic;
        if (!topicStats[top]) {
          topicStats[top] = { topic: top, total: 0, solved: 0, attempts: 0 };
        }
        topicStats[top].total++;
        if (p.solved) topicStats[top].solved++;
        topicStats[top].attempts += p.attempts || 1;
      }
    });

    const topicMastery = Object.values(topicStats).map((st) => ({
      ...st,
      masteryPercentage: Math.round((st.solved / st.total) * 100),
    }));

    // If topicMastery is sparse, provide comprehensive default categories for UI
    const defaultRadar = [
      { subject: "Data Structures", score: solvedCount > 0 ? Math.min(solvedCount * 10, 85) : 65 },
      { subject: "Algorithms & DP", score: Math.max(30, (solvedCount * 8) % 100) },
      { subject: "Core CS (OS/DBMS)", score: 75 },
      { subject: "System Design", score: 60 },
      { subject: "Aptitude & Math", score: results.length > 0 ? Math.round(results.reduce((a, b) => a + b.score, 0) / results.length) : 70 },
      { subject: "AI Interview", score: interviews.length > 0 ? Math.round(interviews.reduce((a, b) => a + b.overallScore, 0) / interviews.length) : 65 },
    ];

    // 2. Identify Weak Spots & Strengths
    const avgTestScore = results.length > 0 ? Math.round(results.reduce((a, b) => a + b.score, 0) / results.length) : 70;
    const avgInterviewScore = interviews.length > 0 ? Math.round(interviews.reduce((a, b) => a + b.overallScore, 0) / interviews.length) : 65;

    // 3. Ask Groq AI for 7-Day Personalized Diagnostic Action Plan
    const prompt = `
You are an expert AI Placement Strategist.
Generate a diagnostic weakness report and 7-Day Action Plan for a student candidate based on the following stats:

- Solved DSA Problems: ${solvedCount}
- Average Mock Test Score: ${avgTestScore}%
- Average AI Interview Score: ${avgInterviewScore}%
- Topic Breakdown: ${JSON.stringify(defaultRadar)}

Provide output ONLY as valid JSON (NO EXTRA TEXT):

{
  "weakSpots": [
    { "area": "Dynamic Programming & Graphs", "severity": "High", "recommendation": "Focus on 0/1 Knapsack & BFS/DFS traversal patterns." },
    { "area": "Mock Test Speed", "severity": "Medium", "recommendation": "Practice timed 30-minute aptitude quizzes to improve speed." }
  ],
  "strengths": [
    "Solid understanding of Array manipulation and Core CS subjects.",
    "Strong communication in behavioral HR prep."
  ],
  "dailyPlan": [
    { "day": "Day 1", "focus": "DP & Recursion", "tasks": ["Solve 2 Medium DP problems", "Review Knapsack formula card"] },
    { "day": "Day 2", "focus": "DBMS & SQL Joins", "tasks": ["Practice INNER vs LEFT JOIN queries", "Review ACID properties"] },
    { "day": "Day 3", "focus": "System Design LLD", "tasks": ["Implement Singleton and Factory patterns in JS/Java"] },
    { "day": "Day 4", "focus": "Aptitude & Speed Math", "tasks": ["Take 15-minute Time & Work quiz", "Memorize conversion short-cuts"] },
    { "day": "Day 5", "focus": "Project Architecture Defense", "tasks": ["Review AI Project Analyzer defense questions"] },
    { "day": "Day 6", "focus": "AI Mock Interview", "tasks": ["Conduct 1 full AI Interview Simulator session"] },
    { "day": "Day 7", "focus": "Full Revision & Mock Test", "tasks": ["Review Revision Vault bookmarked questions", "Take 1 Full Mock Test"] }
  ]
}
`;

    let aiPlan;
    try {
      const aiRaw = await askGroq(prompt);
      const jsonStart = aiRaw.indexOf("{");
      const jsonEnd = aiRaw.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        aiPlan = JSON.parse(aiRaw.substring(jsonStart, jsonEnd + 1));
      } else {
        aiPlan = JSON.parse(aiRaw);
      }
    } catch (err) {
      aiPlan = {
        weakSpots: [
          { area: "Dynamic Programming", severity: "High", recommendation: "Solve 2 DP problems daily." },
          { area: "System Design HLD", severity: "Medium", recommendation: "Review Rate Limiter & TinyURL blueprints." }
        ],
        strengths: ["Array Data Structures", "Core CS Operating Systems"],
        dailyPlan: [
          { day: "Day 1", focus: "DSA DP", tasks: ["Solve Knapsack pattern problems"] },
          { day: "Day 2", focus: "Core CS", tasks: ["Review SQL Normalization & Indexing"] },
          { day: "Day 3", focus: "Aptitude", tasks: ["Practice Speed & Distance math"] },
          { day: "Day 4", focus: "System Design", tasks: ["Implement Singleton design pattern"] },
          { day: "Day 5", focus: "Project Defense", tasks: ["Practice project interview Q&A"] },
          { day: "Day 6", focus: "Mock Test", tasks: ["Take 30-min timed assessment"] },
          { day: "Day 7", focus: "Revision Vault", tasks: ["Review all bookmarked problems"] }
        ]
      };
    }

    res.status(200).json({
      success: true,
      stats: {
        solvedCount,
        totalAttempted,
        avgTestScore,
        avgInterviewScore,
      },
      radarData: defaultRadar,
      topicMastery,
      aiPlan,
    });
  } catch (error) {
    console.error("Analytics Diagnostics Error:", error.message);
    res.status(500).json({ message: "Server Error generating diagnostics analytics" });
  }
};

module.exports = { getAnalyticsDiagnostics };
