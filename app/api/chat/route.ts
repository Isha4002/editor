import { type NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function generateAIResponse(
  messages: ChatMessage[],
  model: string = "qwen2.5:1.5b"
): Promise<string> {
  const systemPrompt = `
You are an expert AI coding assistant.
Help with:
- Code explanations
- Debugging
- Best practices
- Architecture advice
- Code reviews
- Performance optimization

Keep responses concise and practical.
`;

  const prompt = [
    { role: "system", content: systemPrompt },
    ...messages,
  ]
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n\n");

  try {
    console.log("Using model:", model);

    const response = await fetch(
      "http://127.0.0.1:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 150,
          },
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Ollama Error:", text);
      throw new Error(`Ollama returned ${response.status}`);
    }

    const data = await response.json();

    return data.response || "No response generated.";
  } catch (error) {
    console.error("AI Error:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown AI error"
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Request Body:", body);

    const {
      message,
      history = [],
      model = "qwen2.5:1.5b",
    } = body;

    console.log("Received model:", model);

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const messages: ChatMessage[] = [
      ...history,
      {
        role: "user",
        content: message,
      },
    ];

    const aiResponse = await generateAIResponse(
      messages,
      model
    );

    return NextResponse.json({
      response: aiResponse,
      model,
      success: true,
    });
  } catch (error) {
    console.error("Route Error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate AI response",
        details:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "AI Chat API Running",
  });
}