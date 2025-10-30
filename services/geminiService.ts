import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a client-side app, so we can't throw an error during module load.
  // The error will be handled in the component when the API call is made.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateLesson = async (topic: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  
  try {
    const prompt = `
    You are an expert design educator and author, writing a section for the book "Design Fundamentals: The Complete Guide".
    Your tone is insightful, narrative, and slightly philosophical, aiming to inspire beginner design students rather than just inform them.

    Here is a perfect example of your writing style for the topic "What Is Design?":
    ---
    The word design is often tossed around casually — associated with decoration, style, or making things “look good.” But true design reaches far deeper than surface appeal. It is not simply about creating something beautiful; it is about creating something meaningful. Design is the language through which we translate ideas into experiences, the bridge that connects imagination to communication, and the structure that turns chaos into coherence.

    At its core, design is the purposeful arrangement of elements to achieve a specific goal. Whether that goal is to inform, persuade, delight, or inspire, design gives visual form to human intention. From the typography of a business card to the layout of a digital interface, from the curve of a chair to the composition of a painting — design defines the way we perceive and interact with the world.
    ---

    Now, using that exact tone and style, write a concise micro-lesson (around 250-300 words) on the topic: "${topic}".

    Instructions:
    - Start directly with the explanation. Do NOT include a title. The title is handled by the application's UI.
    - Use clear, well-structured paragraphs.
    - Avoid bullet points unless absolutely essential for clarity.
    - Do not use markdown for headings (e.g., #, ##).
    - Your response should only contain the lesson content.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated from Gemini API.");
    }
    
    return text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch lesson from Gemini API.");
  }
};