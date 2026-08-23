const CoreCS = require("../models/CoreCS");
const { askGroq } = require("../services/aiService");

// Comprehensive curated seed data for Core CS, System Design, and Aptitude & Reasoning
const seedData = [
  // ================= CORE CS: OPERATING SYSTEMS =================
  {
    _id: "os-101",
    category: "OS",
    section: "CoreCS",
    title: "Processes, Threads & Concurrency",
    topic: "Process Management",
    difficulty: "Medium",
    summary: "Process states, context switching, CPU scheduling algorithms, threads vs processes, race conditions, and synchronization primitives.",
    keyConcepts: [
      "Process Control Block (PCB) & Context Switching Overhead",
      "User Threads vs Kernel Threads (1:1, N:1, M:N mapping)",
      "CPU Scheduling: FCFS, SJF, Round Robin, Priority Scheduling",
      "Critical Section Problem & Mutex locks vs Counting Semaphores",
      "Deadlock Conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait) & Banker's Algorithm"
    ],
    interviewQuestions: [
      {
        question: "What is the difference between a Process and a Thread?",
        answer: "A process is an executing program with independent memory space (code, data, heap, stack). A thread is a lightweight unit of execution within a process that shares code, data, and OS resources with sibling threads but maintains its own stack and registers.",
        companies: ["TCS", "Amazon", "Infosys", "Microsoft"]
      },
      {
        question: "What is a Deadlock and how can it be prevented?",
        answer: "A deadlock is a state where a set of processes are blocked because each holds a resource and waits for another resource held by another process. It requires 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Deadlock can be prevented by eliminating any one of these conditions (e.g. strict ordering of resource requests to prevent Circular Wait).",
        companies: ["Amazon", "Google", "Cognizant"]
      }
    ],
    quizQuestions: [
      {
        question: "Which CPU scheduling algorithm can suffer from the 'Convoy Effect'?",
        options: ["Round Robin", "First-Come, First-Served (FCFS)", "Shortest Remaining Time First", "Priority Scheduling"],
        correctAnswer: 1,
        explanation: "FCFS suffers from the Convoy Effect when a long CPU-bound process occupies the CPU, forcing short I/O-bound processes to wait indefinitely in the ready queue."
      },
      {
        question: "What is thrashing in Operating Systems?",
        options: ["High CPU utilization due to multi-threading", "Excessive page swapping between RAM and disk", "CPU deadlock caused by semaphores", "Buffer overflow in stack frame"],
        correctAnswer: 1,
        explanation: "Thrashing occurs when the OS spends more time swapping pages in and out of memory than executing actual process instructions."
      }
    ]
  },

  // ================= CORE CS: DBMS & SQL =================
  {
    _id: "dbms-102",
    category: "DBMS",
    section: "CoreCS",
    title: "Database Management Systems & SQL",
    topic: "DBMS & SQL",
    difficulty: "Medium",
    summary: "Relational database concepts, ACID properties, Normalization (1NF to BCNF), Indexing (B-Trees), SQL joins, subqueries, and transactions.",
    keyConcepts: [
      "ACID Properties: Atomicity, Consistency, Isolation, Durability",
      "Database Normalization: 1NF, 2NF, 3NF, BCNF",
      "Indexes: Clustered vs Non-Clustered Indexes, B+ Trees",
      "SQL Joins: INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN",
      "Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable"
    ],
    interviewQuestions: [
      {
        question: "Explain the ACID properties in DBMS.",
        answer: "Atomicity ensures all operations in a transaction complete or none do. Consistency maintains database invariants before and after a transaction. Isolation ensures concurrent transactions do not interfere. Durability guarantees committed changes persist even after system crashes.",
        companies: ["Amazon", "Oracle", "Wipro", "TCS"]
      },
      {
        question: "What is the difference between WHERE and HAVING in SQL?",
        answer: "WHERE filters individual rows before aggregation occurs. HAVING filters aggregated groups created by GROUP BY after aggregation.",
        code: "SELECT department, AVG(salary) \nFROM employees \nWHERE status = 'Active' \nGROUP BY department \nHAVING AVG(salary) > 50000;",
        companies: ["Accenture", "Infosys", "Capgemini"]
      }
    ],
    quizQuestions: [
      {
        question: "Which normal form removes partial dependency (functional dependency on part of a composite key)?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: 1,
        explanation: "Second Normal Form (2NF) requires 1NF compliance and that all non-prime attributes are fully functionally dependent on the entire primary key, eliminating partial dependencies."
      }
    ]
  },

  // ================= CORE CS: COMPUTER NETWORKS =================
  {
    _id: "cn-103",
    category: "CN",
    section: "CoreCS",
    title: "Computer Networks & Web Protocols",
    topic: "Networking",
    difficulty: "Medium",
    summary: "OSI 7-Layer and TCP/IP models, TCP vs UDP, IP addressing, Subnetting, HTTP/HTTPS, DNS lookup, TLS handshake, and Websockets.",
    keyConcepts: [
      "OSI Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application",
      "TCP 3-Way Handshake (SYN, SYN-ACK, ACK) & 4-Way Connection Termination",
      "HTTP vs HTTPS (TLS/SSL encryption, port 80 vs 443)",
      "DNS Resolution flow (Root Server -> TLD -> Authoritative Nameserver)",
      "IPv4 Subnetting & CIDR notation"
    ],
    interviewQuestions: [
      {
        question: "What happens when you type 'https://www.google.com' in your browser?",
        answer: "1. Browser checks cache for DNS entry. 2. DNS query resolves domain to IP address. 3. TCP 3-way handshake establishes socket connection. 4. TLS handshake negotiates encryption keys. 5. HTTP GET request sent. 6. Server responds with HTML/JS/CSS. 7. Browser renders DOM.",
        companies: ["Google", "Amazon", "Microsoft", "Paytm"]
      }
    ],
    quizQuestions: [
      {
        question: "At which layer of the OSI model does the Router operate?",
        options: ["Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)", "Application Layer (Layer 7)"],
        correctAnswer: 1,
        explanation: "Routers operate at Network Layer (Layer 3) to route IP packets between different subnets based on IP addresses."
      }
    ]
  },

  // ================= CORE CS: OBJECT ORIENTED PROGRAMMING =================
  {
    _id: "oops-104",
    category: "OOPs",
    section: "CoreCS",
    title: "Object-Oriented Programming (OOPs)",
    topic: "OOP Concepts",
    difficulty: "Easy",
    summary: "Encapsulation, Abstraction, Inheritance, Polymorphism, Access Modifiers, Interfaces, Abstract Classes, and SOLID Principles.",
    keyConcepts: [
      "4 Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism",
      "Compile-time Polymorphism (Method Overloading) vs Runtime Polymorphism (Method Overriding)",
      "Abstract Classes vs Interfaces",
      "SOLID Principles (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)"
    ],
    interviewQuestions: [
      {
        question: "Explain Polymorphism with an example.",
        answer: "Polymorphism allows objects to take multiple forms. Compile-time polymorphism is achieved via method overloading (same method name, different parameter signature). Runtime polymorphism is achieved via method overriding (subclass redefines parent method using dynamic dispatch).",
        companies: ["TCS", "Infosys", "Wipro", "Cognizant"]
      }
    ],
    quizQuestions: [
      {
        question: "Which SOLID principle states that 'Software entities should be open for extension, but closed for modification'?",
        options: ["Single Responsibility Principle", "Open-Closed Principle", "Liskov Substitution Principle", "Dependency Inversion Principle"],
        correctAnswer: 1,
        explanation: "The Open-Closed Principle (OCP) states that classes should be designable so that new functionality can be added without modifying existing source code."
      }
    ]
  },

  // ================= SYSTEM DESIGN: LLD =================
  {
    _id: "lld-201",
    category: "LLD",
    section: "SystemDesign",
    title: "Low Level Design & Design Patterns",
    topic: "Design Patterns",
    difficulty: "Hard",
    summary: "Creational, Structural, and Behavioral design patterns with code implementations. Object-oriented architecture for scalable class design.",
    keyConcepts: [
      "Creational: Singleton, Factory, Abstract Factory, Builder",
      "Structural: Adapter, Decorator, Facade, Proxy",
      "Behavioral: Observer, Strategy, Command, State",
      "Schema Design & UML Class Diagram conventions"
    ],
    codeSnippet: `// Singleton Pattern in JavaScript
class DatabaseConnection {
  constructor() {
    if (!DatabaseConnection.instance) {
      this.connection = "Connected to MongoDB";
      DatabaseConnection.instance = this;
    }
    return DatabaseConnection.instance;
  }
}
const instance1 = new DatabaseConnection();
const instance2 = new DatabaseConnection();
console.log(instance1 === instance2); // true`,
    interviewQuestions: [
      {
        question: "How do you implement the Observer Pattern and where is it used?",
        answer: "Observer pattern establishes a 1-to-N dependency where a Subject notifies multiple Observers when its state changes. Used in Event Emitters, RxJS streams, Pub/Sub messaging, and UI frameworks.",
        companies: ["Amazon", "Flipkart", "Uber"]
      }
    ],
    quizQuestions: [
      {
        question: "Which design pattern is best suited for adding new behaviors to an object dynamically without modifying its structure?",
        options: ["Factory Pattern", "Decorator Pattern", "Singleton Pattern", "Adapter Pattern"],
        correctAnswer: 1,
        explanation: "The Decorator Pattern attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing."
      }
    ]
  },

  // ================= SYSTEM DESIGN: HLD =================
  {
    _id: "hld-202",
    category: "HLD",
    section: "SystemDesign",
    title: "High Level Design & Distributed Systems",
    topic: "System Architecture",
    difficulty: "Hard",
    summary: "Microservices vs Monolith, Load Balancing, Caching (Redis), Database Sharding & Replication, Message Queues (Kafka/RabbitMQ), and CAP Theorem.",
    keyConcepts: [
      "CAP Theorem (Consistency, Availability, Partition Tolerance)",
      "Load Balancing algorithms (Round Robin, Least Connections, Consistent Hashing)",
      "Caching Strategies (Cache-Aside, Write-Through, Write-Back, LRU eviction)",
      "Database Scaling: Vertical vs Horizontal Scaling, Sharding, Master-Slave Replication",
      "Message Queues (Kafka) for asynchronous processing & decoupling"
    ],
    interviewQuestions: [
      {
        question: "Design a URL Shortening Service (e.g. TinyURL).",
        answer: "1. Functional requirements: Shorten URL, Redirect, Custom alias. 2. Estimation: 100M URLs/month = ~40 write requests/sec, 400 read requests/sec (10:1 ratio). 3. Encoding: Base62 (a-z, A-Z, 0-9) yielding 62^6 = 56.8 Billion unique 6-character URLs. 4. DB: NoSQL Key-Value store (Cassandra/MongoDB) with Redis cache layer.",
        companies: ["Google", "Amazon", "Microsoft", "Atlassian"]
      }
    ],
    quizQuestions: [
      {
        question: "According to the CAP theorem, which two guarantees can a distributed network system maintain in the presence of a network partition?",
        options: ["Consistency and Availability (CP or AP)", "Consistency and Partitioning only", "Latency and Throughput", "Durability and Isolation"],
        correctAnswer: 0,
        explanation: "During a network partition (P), a distributed system must choose between Consistency (CP - returning errors instead of stale data) or Availability (AP - returning most recent available data)."
      }
    ]
  },

  // ================= APTITUDE: QUANTITATIVE =================
  {
    _id: "apt-301",
    category: "Quant",
    section: "Aptitude",
    title: "Quantitative Aptitude Mastery",
    topic: "Math & Quant",
    difficulty: "Easy",
    summary: "Work & Time, Speed Distance Time, Permutations & Combinations, Probability, Profit & Loss, Percentages, and Number Systems.",
    keyConcepts: [
      "Time & Work: If A can do work in X days, 1 day's work = 1/X",
      "Speed = Distance / Time. Relative Speed (Same direction = S1 - S2, Opposite = S1 + S2)",
      "Permutations: nPr = n! / (n-r)!, Combinations: nCr = n! / (r! * (n-r)!)",
      "Profit % = (Profit / Cost Price) * 100",
      "Compounded Interest A = P(1 + r/n)^(nt)"
    ],
    formulas: [
      { title: "Speed, Distance & Time", formula: "Speed = Distance / Time", description: "Km/hr to m/sec conversion: Multiply by 5/18" },
      { title: "Time and Work", formula: "Total Work = Efficiency × Time", description: "Combined work formula: (A × B) / (A + B) days" },
      { title: "Probability", formula: "P(E) = Favorable Outcomes / Total Outcomes", description: "0 <= P(E) <= 1" }
    ],
    quizQuestions: [
      {
        question: "A train 150 meters long crosses a pole in 15 seconds. What is the speed of the train in km/hr?",
        options: ["30 km/hr", "36 km/hr", "45 km/hr", "54 km/hr"],
        correctAnswer: 1,
        explanation: "Speed in m/s = 150 / 15 = 10 m/s. Convert to km/hr: 10 × (18/5) = 36 km/hr."
      },
      {
        question: "A can finish a work in 10 days and B in 15 days. Working together, how many days will they take to complete the work?",
        options: ["5 days", "6 days", "8 days", "7.5 days"],
        correctAnswer: 1,
        explanation: "Combined rate = 1/10 + 1/15 = (3 + 2)/30 = 5/30 = 1/6. Total days = 6 days."
      }
    ]
  },

  // ================= APTITUDE: LOGICAL REASONING =================
  {
    _id: "apt-302",
    category: "Logical",
    section: "Aptitude",
    title: "Logical Reasoning & Analytical Puzzles",
    topic: "Logical Reasoning",
    difficulty: "Medium",
    summary: "Coding-Decoding, Blood Relations, Syllogisms, Seating Arrangements, Direction Sense, and Classic Technical Puzzles.",
    keyConcepts: [
      "Coding-Decoding: Alphabet positions (A=1, Z=26) & reverse pairs (EJOTY rule: 5, 10, 15, 20, 25)",
      "Blood Relations: Generation tree diagram notation (+ for male, - for female)",
      "Syllogisms: Venn Diagram method for All/Some/No statements",
      "Direction Sense: Pythagoras theorem (a^2 + b^2 = c^2) for shortest distance"
    ],
    formulas: [
      { title: "Alphabet Position Shortcut", formula: "EJOTY = 5, 10, 15, 20, 25", description: "Quick reference for letter to number indexing" }
    ],
    quizQuestions: [
      {
        question: "Pointing to a photograph, a man said, 'I have no brother or sister, but that man's father is my father's son.' Whose photograph was it?",
        options: ["His own", "His son's", "His father's", "His nephew's"],
        correctAnswer: 1,
        explanation: "'My father's son' = the man himself (since he has no siblings). So 'that man's father' = the speaker. Therefore, the photo is of his son."
      },
      {
        question: "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that code?",
        options: ["EOJDEJFM", "EOJDJEFM", "MFEDINIC", "MFEJDJEO"],
        correctAnswer: 1,
        explanation: "The first and last letters are swapped and reversed, while middle letters move +1. Result: EOJDJEFM."
      }
    ]
  },

  // ================= APTITUDE: VERBAL REASONING =================
  {
    _id: "apt-303",
    category: "Verbal",
    section: "Aptitude",
    title: "Verbal Ability & Reading Comprehension",
    topic: "Verbal Ability",
    difficulty: "Easy",
    summary: "Sentence Correction, Vocabulary (Synonyms/Antonyms), Para Jumbles, Idioms & Phrases, and Reading Comprehension strategies.",
    keyConcepts: [
      "Subject-Verb Agreement Rules",
      "Modifiers and Dangling Participles",
      "Tense Consistency in compound sentences",
      "Vocabulary building & Root Words (e.g. Bene=Good, Mal=Bad, Chrono=Time)"
    ],
    quizQuestions: [
      {
        question: "Find the synonym of 'EPHEMERAL':",
        options: ["Permanent", "Transient/Short-lived", "Colossal", "Ubiquitous"],
        correctAnswer: 1,
        explanation: "Ephemeral means lasting for a very short time; transient."
      }
    ]
  }
];

// @route   GET /api/core-cs/topics
// @access  Private
const getTopics = async (req, res) => {
  try {
    const { section, category } = req.query;

    let filtered = [...seedData];

    if (section) {
      filtered = filtered.filter((t) => t.section.toLowerCase() === section.toLowerCase());
    }

    if (category) {
      filtered = filtered.filter((t) => t.category.toLowerCase() === category.toLowerCase());
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    console.error("Get Core CS Topics Error:", error.message);
    res.status(500).json({ message: "Server Error fetching topics" });
  }
};

// @route   GET /api/core-cs/topic/:id
// @access  Private
const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = seedData.find((t) => t._id === id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({ success: true, data: topic });
  } catch (error) {
    console.error("Get Core CS Topic Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   POST /api/core-cs/submit-quiz
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { topicId, answers } = req.body; // answers: { [questionIndex]: selectedOptionIndex }

    const topic = seedData.find((t) => t._id === topicId);
    if (!topic || !topic.quizQuestions) {
      return res.status(404).json({ message: "Topic or Quiz not found" });
    }

    let score = 0;
    const total = topic.quizQuestions.length;
    const breakdown = topic.quizQuestions.map((q, idx) => {
      const selected = answers[idx];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) score++;
      return {
        questionIndex: idx,
        question: q.question,
        selectedOption: selected,
        correctOption: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const percentage = Math.round((score / total) * 100);

    res.status(200).json({
      success: true,
      score,
      total,
      percentage,
      breakdown,
    });
  } catch (error) {
    console.error("Submit Quiz Error:", error.message);
    res.status(500).json({ message: "Server Error evaluating quiz" });
  }
};

// @route   POST /api/core-cs/ai-explain
// @access  Private
const aiExplain = async (req, res) => {
  try {
    const { concept, question, context } = req.body;

    if (!concept && !question) {
      return res.status(400).json({ message: "Concept or Question is required" });
    }

    const prompt = `
You are a Senior Principal Engineer and Hiring Committee Chair.
Explain the following concept for a universal technical hiring interview (applicable to all Product, Service, FinTech, and Startup companies):

Target Subject/Concept: ${concept || "N/A"}
Specific Question/Problem: ${question || "N/A"}
Additional Context: ${context || "Universal Technical Placement Preparation"}

Provide a clean Markdown response structured as follows:
1. 💡 **Core Concept Overview** (Clear 2-3 sentence explanation)
2. 🔑 **Key Engineering Principles & Edge Cases** (Bullet points)
3. 💻 **Implementation Code / Formula** (if applicable)
4. 🎙 **How to Answer in Any Technical Interview** (Clean 30-second response to an interviewer)
`;

    const aiMarkdown = await askGroq(prompt);

    res.status(200).json({
      success: true,
      explanation: aiMarkdown,
    });
  } catch (error) {
    console.error("AI Explain Error:", error.message);
    res.status(500).json({ message: "Failed to generate AI explanation" });
  }
};

module.exports = {
  getTopics,
  getTopicById,
  submitQuiz,
  aiExplain,
};
