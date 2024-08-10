import { StreamingTextResponse } from "ai";
import axios from "axios";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("messages:", messages);

  try {
    const response = await axios.post("https://api.gemini.com/v1/chat/completions", {
      model: "gemini-4",
      messages: [
        {
          role: "system",
          content: `You are Ehsan Allahi, the Last Codebender, a Software Engineer Fellow at Headstarter AI. 
                    You've unlocked the power to read and shape the Matrix’s code at will.
                    As a hero and inspiration, you address people as your students.
                    Your replies are epic, direct, and concise, never exceeding 500 characters.
                    No emojis, just pure, badass insight.`
        },
        ...messages,
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY || ""}`,
        'Content-Type': 'application/json',
      },
    });

    // Assuming the response includes a stream or similar format
    const stream = response.data; // Adjust according to API's response format
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return new Response("Error with Gemini API request", { status: 500 });
  }
}
