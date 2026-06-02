import { type NextRequest, NextResponse } from 'next/server';

interface CodeSuggestionRequest {
    fileContent: string;
    cursorLine: number;
    cursorColumn: number;
    suggestionType: string;
    fileName: string;

}

interface CodeContext {
    language: string;
    framework: string;
    beforeContext: string;
    afterContext: string;
    currentLine: string;
    cursorPosition: { line: number; column: number };
    isInFunction: boolean;
    isInClass: boolean;
    isAfterComment: boolean;
    iscompletePatterns: string[];

}

export async function POST(request: NextRequest) {
    try {
        const body: CodeSuggestionRequest = await request.json();

        const { fileContent, cursorLine, cursorColumn, suggestionType, fileName } = body

        if (!fileContent || cursorLine < 0 || cursorColumn < 0 || !suggestionType) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });

        }

        const context = analyzeCodeContext(fileContent, cursorLine, cursorColumn, fileName); 

        const prompt = buildPrompt(context, suggestionType);

        const suggestion = await generateSuggestion(prompt);

        return NextResponse.json({ 
            suggestion,
            context,
            metadata: {
                language: context.language,
                framework: context.framework,
                position: context.cursorPosition,
                generatedAt: new Date().toISOString(),
            }
        });
    } catch (error: any) {
        console.error('Error generating code suggestion:', error);
        return NextResponse.json({ error: 'Failed to generate code suggestion', message: error.message }, { status: 500 });
    }
}

function analyzeCodeContext(content: string, line: number, column: number, fileName?: string): 
CodeContext {
    const lines = content.split('\n');
    const currentLine = lines[line] || '';

    const contextRadius = 10
    const startLine = Math.max(0, line - contextRadius)
    const endLine = Math.min(lines.length, line + contextRadius)

    const beforeContext = lines.slice(startLine, line).join('\n');
    const afterContext = lines.slice(line + 1, endLine).join('\n');

    const language = detectLanguage(content,fileName)
    const framework = detectFramework(content);

    const isInFunction = detectInFunction(lines, line);
    const isInClass = detectInClass(lines, line);
    const isAfterComment = detectAfterComment(currentLine, column)
    const iscompletePatterns = detectIncompletePatterns(currentLine, column);

return {
    language,
    framework,
    beforeContext,
    afterContext,
    currentLine,
    cursorPosition: { line, column },
    isInFunction,
    isInClass,
    isAfterComment,
    iscompletePatterns,
}
}

function buildPrompt(context: CodeContext, suggestionType: string): string {
    return `You are an expert code completion assistant. Generate a ${suggestionType} suggestion.

 
    Language: ${context.language}
    Framework: ${context.framework}

context:
${context.beforeContext}
${context.currentLine.substring(0, context.cursorPosition.column)}|CURSOR|${context.currentLine.substring(context.cursorPosition.column)}
${context.afterContext}

Analysis:
- In Function: ${context.isInFunction}
- In Class: ${context.isInClass}
- After Comment: ${context.isAfterComment}
- Incomplete Patterns: ${context.iscompletePatterns.join(', ') || "None"}

Instructions:
1. Provide only the code that should be inserted at the cursor
2. Maintain proper indentation and style
3. Follow ${context.language} best practices
4. Make the suggestion contextually appropriate

Generate suggestion:`
}

async function generateSuggestion( prompt: string): Promise<string> {
  try {
    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {"Content-Type": "application/json", },
        body: JSON.stringify({
          model: "qwen2.5:1.5b",
          prompt,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `API error: ${response.statusText}`
      );
    }

    const data = await response.json();

    let suggestion = data.response || "";

    // Clean up suggestion
    if (suggestion.includes("```")) {
      const codeMatch = suggestion.match(/```(?:\w+)?\n([\s\S]*?)```/ );

      suggestion = codeMatch ? codeMatch[1].trim(): suggestion;
    }

    return suggestion;
  } catch (error) {
    console.error("AI generation error:",error);

    return "// AI suggestion unavailable";
  }
}

function detectLanguage(content: string, fileName?: string): string {
    if (fileName) {
        const ext = fileName.split(".").pop()?.toLowerCase();

        const extMap: Record<string, string> = {
            js: "JavaScript",
            ts: "TypeScript",
            py: "Python",
            java: "Java",
            rb: "Ruby",
            go: "Go",
            php: "PHP",
            rs: "Rust",
            tsx: "TypeScript",
            jsx: "JavaScript",
        };

        return ext ? extMap[ext] || "Unknown" : "Unknown";
    }

    return "Unknown";
}

    function detectFramework(content: string): string {
        if (content.includes("import React") || content.includes("useState")) return "React";
        if (content.includes("import Vue") || content.includes("<template>")) return "Vue";
        if (content.includes("@angular/") || content.includes("@Component")) return "Angular";
        if (content.includes("next/") || content.includes("getServerSideProps")) return "Next.js";

        return "None"

    }

    function detectInFunction(lines: string[], currentLine: number): boolean {
    for (let i = currentLine - 1; i >= 0; i--) {
        const line = lines[i]
        if (line?.match(/^\s*(function|def|const\s+\w+\s*=)/)) return true
        if (line?.match(/^\s*}/)) break
    }
    return false;
}

function detectInClass(lines: string[], currentLine: number): boolean {
    for (let i = currentLine - 1; i >= 0; i--) {
        const line = lines[i]
        if (line?.match(/^\s*(class|interface)\s+/)) return true
    }
    return false;
}

function detectAfterComment(line: string, column: number): boolean {
    const beforeCursor = line.substring(0, column);
    return /\/\/.*$/.test(beforeCursor) || /#.*$/.test(beforeCursor)
    }

function detectIncompletePatterns(line: string, column: number): string[] {
    const beforeCursor = line.substring(0, column);
    const patterns: string[] = [];

    if (/^\s*(if|for|while)\s*\(.*$/.test(beforeCursor.trim())) patterns.push("conditional")
    if (/^\s*(function|def)\s*$/.test(beforeCursor.trim())) patterns.push("function")
        if (/\{\s*$/.test(beforeCursor)) patterns.push("object")
        if (/\[\s*$/.test(beforeCursor)) patterns.push("array")
        if (/=\s*$/.test(beforeCursor)) patterns.push("assignment")
        if (/\.\s*$/.test(beforeCursor)) patterns.push("method-call")

    return patterns;
}








