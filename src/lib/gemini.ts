import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_AI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateSummary(content: string) {
  if (!genAI) {
    console.warn("AI summarization skipped: GOOGLE_AI_API_KEY is missing.");
    return null;
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Please provide a concise, engaging summary of about 200 words for the following blog post content. Focus on the main points and key takeaways:\n\n${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Summary Generation Error:", error);
    return null;
  }
}
