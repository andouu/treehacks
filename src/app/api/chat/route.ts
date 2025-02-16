import { groq } from "@ai-sdk/groq";
import { CoreMessage, streamText } from "ai";

export async function POST(req: Request) {
  const { user, messages } = await req.json();
  if (!messages) {
    return new Response(JSON.stringify({ error: "No prompt provided" }), {
      status: 400,
    });
  }

  console.log({ user });

  // todo: fetch sys prompt
  const { name, experience, riskTolerance, interests } = user;
  const sysFetch = await fetch("http://localhost:8000/api/sysprompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: (messages as CoreMessage[]).findLast((m) => m.role === "user")!
        .content,
      name,
      experience,
      riskTolerance,
      interests,
    }),
  });
  const { system_prompt } = await sysFetch.json();
  console.log(system_prompt);

  const result = streamText({
    model: groq("deepseek-r1-distill-llama-70b"),
    messages,
    system: system_prompt,
  });

  return result.toDataStreamResponse();
}
