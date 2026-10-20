export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AssistantProvider = {
  generate(messages: ChatMessage[], systemPrompt: string): Promise<string>;
};
