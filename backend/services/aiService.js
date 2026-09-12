const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askGroq = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "groq/compound-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
};

module.exports = {
  askGroq,
};