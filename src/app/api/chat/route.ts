import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { messages } = await req.json();
  if (!messages) {
    return new Response(JSON.stringify({ error: "No prompt provided" }), {
      status: 400,
    });
  }

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    system: "You are a helpful assistant. Your name is Aaron.",
  });

  return result.toDataStreamResponse();
}
