const { askGroq } = require("../services/aiService");

// @route   POST /api/project-analyzer/analyze
// @access  Private
const analyzeProject = async (req, res) => {
  try {
    const { title, githubUrl, techStack, description, keyFeatures } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Project Title and Description are required." });
    }

    const prompt = `
You are a Principal Software Architect and Senior Technical Recruiter at a top tech company.
Analyze the following student resume project for a technical placement interview:

Project Title: ${title}
GitHub URL: ${githubUrl || "Not provided"}
Tech Stack: ${techStack || "Not specified"}
Project Description: ${description}
Key Features: ${keyFeatures || "Not specified"}

Please evaluate this project thoroughly and provide a structured JSON response (AND ONLY VALID JSON, NO MARKDOWN OUTSIDE THE JSON):

{
  "architectureRating": 85,
  "verdict": "Production Ready / Promising / Needs Architecture Hardening",
  "summary": "Short 2-3 sentence overview of the project strength and overall impression for an interviewer.",
  "techStackEvaluation": [
    { "tech": "React/Frontend", "feedback": "Good use of client-side routing. Consider adding state management like Redux/Zustand." },
    { "tech": "Backend/Database", "feedback": "Solid REST API setup. Ensure index optimizations on frequently queried fields." }
  ],
  "defenseQuestions": [
    {
      "category": "Architecture & Tech Choices",
      "question": "Why did you choose your database over alternative databases for this specific project?",
      "suggestedAnswer": "Explain data modeling requirements, schema flexibility vs ACID compliance, and query patterns.",
      "interviewerTip": "Focus on trade-offs rather than saying it was just easy to set up."
    },
    {
      "category": "Scalability & Performance",
      "question": "How would your application handle 10,000 concurrent active users during peak traffic?",
      "suggestedAnswer": "Mention horizontal scaling, load balancing with Nginx, caching frequent reads in Redis, and DB read-replicas.",
      "interviewerTip": "Highlight stateless JWT auth allowing horizontal server instances."
    },
    {
      "category": "Security & Edge Cases",
      "question": "What security measures did you implement to prevent unauthorized access or data breaches?",
      "suggestedAnswer": "JWT token verification in headers, bcrypt hashing for passwords, rate limiting, and CORS configuration.",
      "interviewerTip": "Mention input validation to prevent SQL/NoSQL injection."
    },
    {
      "category": "System Bottlenecks",
      "question": "What is the biggest performance bottleneck in your current architecture and how would you fix it?",
      "suggestedAnswer": "Identify synchronous API calls, unindexed queries, or large asset sizes, and outline caching/indexing fixes.",
      "interviewerTip": "Be transparent about trade-offs; interviewers respect engineering self-awareness."
    }
  ],
  "scalabilityBottlenecks": [
    "Single database instance without replication",
    "Missing caching layer for high-frequency endpoints"
  ],
  "resumeBulletImprovements": [
    "Architected and deployed a full-stack platform supporting user authentication, interactive assessments, and AI feedback.",
    "Integrated Groq LLM APIs to deliver real-time automated evaluation, reducing manual assessment overhead by 100%."
  ]
}
`;

    const aiRawResponse = await askGroq(prompt);

    // Parse JSON cleanly from Groq output
    let parsedData;
    try {
      const jsonStart = aiRawResponse.indexOf("{");
      const jsonEnd = aiRawResponse.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonSub = aiRawResponse.substring(jsonStart, jsonEnd + 1);
        parsedData = JSON.parse(jsonSub);
      } else {
        parsedData = JSON.parse(aiRawResponse);
      }
    } catch (parseErr) {
      console.warn("Falling back to structured wrapper for Groq response");
      parsedData = {
        architectureRating: 80,
        verdict: "Promising Project Architecture",
        summary: aiRawResponse.substring(0, 300) + "...",
        techStackEvaluation: [
          { tech: techStack || "Tech Stack", feedback: "Valid full-stack architecture setup." }
        ],
        defenseQuestions: [
          {
            category: "Technical Choice",
            question: `Why did you select ${techStack} for ${title}?`,
            suggestedAnswer: "Discuss performance, developer velocity, ecosystem support, and architectural fit.",
            interviewerTip: "Focus on technical trade-offs."
          }
        ],
        scalabilityBottlenecks: ["Database indexing", "Caching layer"],
        resumeBulletImprovements: [
          `Developed ${title} utilizing ${techStack} to deliver high-performance user experience.`
        ]
      };
    }

    res.status(200).json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error("Project Analyzer Error:", error.message);
    res.status(500).json({ message: "Server Error analyzing project" });
  }
};

module.exports = { analyzeProject };
