import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { user, ...rest } = await req.json();

  const ticker = rest.prompt;

  const { name, experience, riskTolerance, interests } = user;
  const sysFetch = await fetch("http://localhost:8000/api/sysprompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: `Analyze NYSE Symbol ${ticker}`,
      name,
      experience,
      riskTolerance,
      interests,
    }),
  });

  const { system_prompt } = await sysFetch.json();

  const result = streamText({
    model: groq("deepseek-r1-distill-llama-70b"),
    messages: [
      {
        role: "system",
        content: system_prompt,
      },
      {
        role: "user",
        content: `Analyze NYSE Symbol ${ticker}`,
      },
    ],
    system: system_prompt,
  });

  return result.toDataStreamResponse();
}
