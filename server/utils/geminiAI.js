const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
// USER: Replace with your actual Gemini API Key
const API_KEY = "YOUR_GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

const generateInsights = async (employeeData) => {
  try {
    if (API_KEY === "YOUR_GEMINI_API_KEY") {
      return {
        feedback: "Please provide a valid Gemini API key in server/utils/geminiAI.js to get real AI insights.",
        suggestions: [
          "Connect Gemini API to see personalized growth paths.",
          "Enable AI to predict your performance trends."
        ]
      };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      Analyze the following employee data for a Reward System:
      Name: ${employeeData.name}
      Points: ${employeeData.points}
      Attendance (Weekly): ${employeeData.attendance.weekly}%
      Recent Performance Score: ${employeeData.performance.score}
      
      Provide:
      1. A short, professional feedback sentence.
      2. Three actionable suggestions to improve productivity or earn more rewards.
      3. A motivational quote for the day.
      
      Return the response in JSON format:
      {
        "feedback": "...",
        "suggestions": ["...", "...", "..."],
        "motivation": "..."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Attempt to parse JSON from the response
    try {
      return JSON.parse(text);
    } catch (e) {
      // Fallback if not valid JSON
      return {
        feedback: text.substring(0, 100),
        suggestions: ["Continue your great work!", "Focus on skill development."],
        motivation: "Success is not final, failure is not fatal."
      };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

module.exports = { generateInsights };
