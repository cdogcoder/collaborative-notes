import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request) {
  try {
    const chatHistory = await request.json();
    if (!Array.isArray(chatHistory)) {
      return NextResponse.json(
        { error: "Invalid chat history format" },
        { status: 400 }
      );
    }

    const systemInstruction =
      `Your job is to summarize document notes. You will be fed up to a page's worth of text content from a document and you will need to create them into concise and easily understandable paragraphs of information. The summary will be split up into three main sections, and it is imperative that you make these sections very obvious and in accordance with the instructions that are given hereafter. One section should be labeled 'Main Ideas' and should have anywhere from 1-3 sentences long that explain simply what the main ideas in the content are (3 is minimum and 5 is maximum; you should create the summary based on how much content is provided). The section after that should be labeled 'Key Insights' where you provide your ideas, as an AI, as to what you believed was useful information within the notes. Make this section anywhere from 3-5 bullet points (again, more or less bullet points depending on the length of the content provided). Lastly, there should be another section after that labeled 'Next Steps' where you, as an AI, will provide some next steps that the user should take to achieve some greater result based on the notes. This section should be anywhere from 1-3 sentences (again, more or less sentences depending on the length of content provided). This next part is very important, so make sure to follow it to a tee. Return the full summary in a JavaScript object like so: {"Main Ideas": main-idea-text, "Key Insights": key-insights-text, "Next Steps": next-steps-text}. I don't want any other text or the word 'json' at the beginning of the string to be returned, just the object in a string. The 'Main Ideas' text and the 'Next Steps' text should have all the sentences contained in one plain text string, whereas the 'Key Insights' text should be contained in an array, where each of the elements is a plain text string with a bullet point's text content. I WANT PLAIN TEXT IN A STRING WITH NO SPECIAL NEWLINE CHARACTERS OR ANYTHING OF THE SORT, JUST THE PURE TEXT IN A STRING. Every time the user replies, it is your job then to clarify or provide any extra details about the summary you've written to help the user understand your ideas. These replies should be in plain text, with no other special characters contained in the string. Make these replies short, concise, and without excess detail unless it is later requested from the user. 
      Any message that is sent to you that isn't a block of text (such as a question, greeting, clarification, or statement) should be responded to in this kind of reply.`;

    const response = await model.generateContentStream({
      contents: chatHistory,
      systemInstruction: systemInstruction,
    });

    console.log("Raw API Response:", response);

    if (!response || typeof response !== "object") {
      console.error("API returned invalid response:", response);
      return NextResponse.json(
        { error: "Gemini API returned an invalid response." },
        { status: 500 }
      );
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      try {
        for await (const chunk of response.stream) {
          console.log("Chunk received:", chunk);
          if (chunk.text) {
            await writer.write(encoder.encode(chunk.text() + "\n"));
          }
        }
      } catch (error) {
        console.error("Could not process Gemini API response stream:", error);
      } finally {
        writer.close();
      }
    })();

    return new Response(readable, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.error();
  }
}
