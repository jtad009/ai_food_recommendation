"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function getChatSummary(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: openai("gpt-4o"),
    prompt: question,
    system: `You are a helpful assistant.
Given a user's message, generate a concise chat title (max 10 words) summarizing the main topic of the message.
Always provide a summary based only on the text sent.`,
  });
  return { text, finishReason, usage };
}
