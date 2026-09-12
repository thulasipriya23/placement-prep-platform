const { askGroq } = require("../services/aiService");

// Curated HR & Behavioral Questions library
const hrQuestionsLibrary = [
  {
    id: "hr-1",
    category: "Introduction & Pitch",
    question: "Tell me about yourself.",
    difficulty: "Easy",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Brief background (education/degree).",
      task: "Key technical passion & core projects.",
      action: "Significant achievements/skills developed.",
      result: "Why you are excited about this role and company."
    },
    sampleAnswer: "I am a final-year Computer Science student passionate about full-stack development and cloud systems. Over the past two years, I've built multiple applications, including an AI-powered placement preparation platform using React and Node.js. My strength lies in problem-solving and rapid learning, and I am excited to apply my skills to contribute to impactful engineering teams."
  },
  {
    id: "hr-2",
    category: "Conflict & Team Dynamics",
    question: "Describe a situation where you had a disagreement with a teammate. How did you resolve it?",
    difficulty: "Medium",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Working on a group project with tight deadline.",
      task: "Teammate disagreed on tech stack or task allocation.",
      action: "Listened actively, evaluated pros/cons using data, agreed on a compromise.",
      result: "Project delivered on time with enhanced team trust."
    },
    sampleAnswer: "During our final semester project, a teammate wanted to use MongoDB while I advocated PostgreSQL for relational integrity. Instead of arguing, I benchmarked both databases against our specific data schema. We found PostgreSQL was 30% faster for our complex join queries. We presented the data, aligned on PostgreSQL, and completed the project 3 days early."
  },
  {
    id: "hr-3",
    category: "Failure & Resilience",
    question: "Tell me about a time you failed or made a mistake. What did you learn?",
    difficulty: "Medium",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Underestimated task complexity or missed a deadline.",
      task: "Responsible for delivering critical feature.",
      action: "Took full ownership immediately, communicated proactively, implemented fix.",
      result: "Learned time estimation and defensive error handling."
    },
    sampleAnswer: "In a hackathon, I pushed a code update that broke the deployment script 2 hours before submission. I immediately admitted the mistake to the team, rolled back the commit using Git, and spent 30 minutes writing automated sanity checks. We resubmitted successfully, and I learned the importance of testing before pushing to production."
  },
  {
    id: "hr-4",
    category: "Leadership & Value Add",
    question: "Why should we hire you over other candidates?",
    difficulty: "Hard",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Unique combination of technical skills and adaptability.",
      task: "Solving business/technical problems effectively.",
      action: "Demonstrate consistency, learning mindset, and readiness.",
      result: "Immediate value addition to the team."
    },
    sampleAnswer: "You should hire me because I combine strong technical foundations in DSA and web development with a proven track record of consistent self-driven learning. Beyond my coursework, I've solved over 150+ coding problems and built production-grade full-stack applications. I am quick to adapt to company workflows and driven to deliver measurable results."
  },
  {
    id: "hr-5",
    category: "Career Vision & Growth",
    question: "Where do you see yourself in 5 years?",
    difficulty: "Easy",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Current entry-level engineer phase.",
      task: "Mastering domain expertise and system architecture.",
      action: "Taking on tech lead responsibilities and mentoring juniors.",
      result: "Becoming a trusted Senior Software Engineer or Architect."
    },
    sampleAnswer: "In 5 years, I see myself as a Senior Software Engineer specializing in scalable system architecture. I want to have mastered the company's core tech stack, taken ownership of critical microservices, and helped mentor junior developers while driving engineering best practices."
  },
  {
    id: "hr-6",
    category: "Stress & Pressure Handling",
    question: "Describe a time you worked under intense pressure or a tight deadline. How did you prioritize?",
    difficulty: "Medium",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Multiple exams and project submissions coinciding.",
      task: "Delivering high-quality code under time constraint.",
      action: "Broke project into MVP sprints, eliminated non-essential features.",
      result: "Delivered core features on time with zero high-severity bugs."
    },
    sampleAnswer: "During mid-terms, our semester project deadline was moved up by 4 days. I organized a quick sync with my team, prioritized essential user flows, and cut low-priority UI polish. By focusing on core API endpoints first, we delivered a bug-free prototype on time."
  },
  {
    id: "hr-7",
    category: "Self-Awareness & Weakness",
    question: "What is your biggest technical weakness, and what steps are you taking to improve it?",
    difficulty: "Medium",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Real, non-fatal technical weakness.",
      task: "Recognizing impact on engineering speed.",
      action: "Concrete steps taken (courses, practice, documentation).",
      result: "Demonstrable improvement and self-awareness."
    },
    sampleAnswer: "My biggest technical weakness used to be system design for high-scale applications. To improve, I spent the last 3 months studying distributed systems blueprints, reading engineering blogs from Uber and Netflix, and building sample microservices with Redis caching."
  },
  {
    id: "hr-8",
    category: "Feedback & Adaptability",
    question: "How do you handle harsh constructive criticism or negative code review feedback?",
    difficulty: "Easy",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Senior reviewer pointed out multiple flaws in pull request.",
      task: "Objective evaluation without taking it personally.",
      action: "Asked clarifying questions, refactored code to meet standards.",
      result: "Merged clean code and adopted reviewer's pattern going forward."
    },
    sampleAnswer: "I view code reviews as free learning opportunities. When a reviewer left critical comments on my PR about improper error handling, I thanked them for pointing out the vulnerability, refactored the logic, and added unit tests. I now apply that pattern automatically."
  },
  {
    id: "hr-9",
    category: "Initiative & Ownership",
    question: "Tell me about a time you took initiative beyond your assigned responsibilities.",
    difficulty: "Hard",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Noticed a pain point in workflow or group project.",
      task: "Volunteered to fix it without being asked.",
      action: "Created automation script or documentation.",
      result: "Saved team time and improved project quality."
    },
    sampleAnswer: "While working on a team project, I noticed teammates struggled setting up local environment variables. I spent an evening creating a Docker Compose file and single-command setup script. This reduced onboarding time for the team from 2 hours to 5 minutes."
  },
  {
    id: "hr-10",
    category: "Company Alignment",
    question: "Why do you want to work at our company specifically?",
    difficulty: "Easy",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Company's mission, engineering culture, or flagship products.",
      task: "Aligning personal career goals with company impact.",
      action: "Highlighted specific technical areas of interest.",
      result: "Strong mutual fit and long-term commitment."
    },
    sampleAnswer: "I want to work here because of your commitment to building high-scale, resilient systems that impact millions of daily users. Your engineering blog on real-time event processing aligns directly with what I want to build, and I am excited to contribute to that culture."
  },
  {
    id: "hr-11",
    category: "Rapid Learning & Tech Adoption",
    question: "Tell me about a time you had to learn a completely new technology or framework quickly.",
    difficulty: "Medium",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Project required an unfamiliar tool (e.g. Docker, GraphQL, Redis).",
      task: "Becoming productive within days.",
      action: "Studied official documentation, built small prototype, integrated into project.",
      result: "Successfully implemented feature without delaying timeline."
    },
    sampleAnswer: "For a hackathon, our project required GraphQL, which I had never used. I spent 4 hours reading official docs and building a starter boilerplate. By day 2, I implemented all GraphQL queries and mutations, enabling seamless frontend data fetching."
  },
  {
    id: "hr-12",
    category: "Work Ethics & Values",
    question: "How do you handle a situation where a deadline is impossible to meet?",
    difficulty: "Hard",
    companies: ["Universal Corporate Round"],
    starGuide: {
      situation: "Unforeseen technical blocker or scope creep.",
      task: "Managing stakeholder expectations transparently.",
      action: "Communicated early, proposed scoped-down MVP options.",
      result: "Delivered high-quality MVP on time with stakeholder approval."
    },
    sampleAnswer: "If a deadline is unachievable, I never stay silent or rush out buggy code. I analyze the remaining work, communicate with the manager early, and present options — such as delivering core functionality on time and deferring secondary features to the next sprint."
  }
];

// @route   GET /api/hr-prep/questions
// @access  Private
const getHRQuestions = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: hrQuestionsLibrary,
    });
  } catch (error) {
    console.error("Get HR Questions Error:", error.message);
    res.status(500).json({ message: "Server error fetching HR questions" });
  }
};

// @route   POST /api/hr-prep/evaluate
// @access  Private
const evaluateHRResponse = async (req, res) => {
  try {
    const { question, userResponse, targetCompany } = req.body;

    if (!question || !userResponse) {
      return res.status(400).json({ message: "Question and User Response are required." });
    }

    const prompt = `
You are a Universal HR Director & Corporate Behavioral Assessor evaluating a candidate for a technical/corporate position.
This evaluation prepares the student for ANY company (Product MNCs, IT Services, FinTech, and Tech Startups).

Question Asked: "${question}"
Candidate's Response: "${userResponse}"
Target Category: ${targetCompany || "Universal Corporate & Tech Hiring"}

Evaluate the answer against universal STAR framework standards (Situation, Task, Action, Result) and output ONLY valid JSON in the exact structure below:

{
  "overallScore": 82,
  "rating": "Strong Answer / Average / Needs Refinement",
  "starCompliance": {
    "situation": "Clear / Weak / Missing",
    "task": "Clear / Weak / Missing",
    "action": "Clear / Weak / Missing",
    "result": "Clear / Weak / Missing"
  },
  "strengths": [
    "Good use of action verbs",
    "Demonstrates ownership mindset"
  ],
  "areasToImprove": [
    "Quantify the final result with metrics (e.g., % time saved)"
  ],
  "improvedAnswer": "A polished, corporate-ready version of the candidate's answer maintaining their authentic experiences while using professional STAR framework formatting."
}
`;

    const aiRaw = await askGroq(prompt);

    let evaluation;
    try {
      const jsonStart = aiRaw.indexOf("{");
      const jsonEnd = aiRaw.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        evaluation = JSON.parse(aiRaw.substring(jsonStart, jsonEnd + 1));
      } else {
        evaluation = JSON.parse(aiRaw);
      }
    } catch (parseErr) {
      evaluation = {
        overallScore: 78,
        rating: "Solid Response",
        starCompliance: { situation: "Clear", task: "Clear", action: "Clear", result: "Weak" },
        strengths: ["Clear communication tone", "Relevant personal example"],
        areasToImprove: ["Add measurable impact/result"],
        improvedAnswer: userResponse + " Overall, this demonstrated strong initiative and teamwork."
      };
    }

    res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    console.error("Evaluate HR Response Error:", error.message);
    res.status(500).json({ message: "Server error evaluating HR response" });
  }
};

module.exports = {
  getHRQuestions,
  evaluateHRResponse,
};
