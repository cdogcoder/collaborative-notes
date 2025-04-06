import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

export async function POST(request) {
    try {
        const chatHistory = await request.json();
        if (!Array.isArray(chatHistory)) {
            return NextResponse.json({error: "Invalid chat history format"}, {status: 400});
        }

        const systemInstruction = "Your job is to summarize document notes. You will be fed up to a page's worth of text content from a document and you will need to create them into concise and easily understandable paragraphs of information. The summary will be split up into three main sections, and it is imperative that you make these sections very obvious and in accordance with the instructions that are given hereafter. One section should be labeled 'Main Ideas' and should have anywhere from 3-5 sentences long that explain simply what the main ideas in the content are (3 is minimum and 5 is maximum; you should create the summary based on how much content is provided). The section after that should be labeled 'Key Insights' where you provide your ideas, as an AI, as to what you believed was useful information within the notes. Make this section anywhere from 5-7 bullet points (again, more or less bullet points depending on the length of the content provided). Lastly, there should be another section after that labeled 'Next Steps' where you, as an AI, will provide some next steps that the user should take to achieve some greater result based on the notes. This section should be anywhere from 1-3 sentences (again, more or less sentences depending on the length of content provided).";
        
        const response = await model.generateContentStream({
            contents: chatHistory,
            systemInstruction: systemInstruction
        })

        console.log("Raw API Response:", response);
        
        if (!response || typeof response !== "object") {
            console.error("API returned invalid response:", response);
            return NextResponse.json({error: "Gemini API returned an invalid response."}, {status: 500});
        }

        const {readable, writable} = new TransformStream();
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
            headers: {"Content-Type": "text/plain"}
        });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.error();
    }
}