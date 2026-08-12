import { NextResponse } from "next/server";

// ============================================================================
// BHARATH K'S PORTFOLIO ASSISTANT — GEMINI API BACKEND ROUTE
// ============================================================================
// 1. Get your API Key from Google AI Studio: https://aistudio.google.com/
// 2. Add it to your .env.local file in the root directory:
//    GEMINI_API_KEY=your_actual_api_key_here
// ============================================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const systemInstruction = `You are "Bharath K's Portfolio Assistant", an intelligent AI agent integrated into Bharath K's personal engineering website.
Your role is to represent Bharath K professionally, enthusiastically, and accurately to recruiters, potential clients, engineering leads, and visitors.

Key facts about Bharath K to use in your responses:
- Current Role / Status: AI Engineer, GenAI Product Architect, & Full-Stack Developer pursuing B.E. in Computer Science Engineering at M.A.M. College of Engineering and Technology (2022-2026, CGPA: 8.0).
- Location: Karur, Tamil Nadu, India. Open to AI Engineering & Full-Stack roles.
- Email: bharathkkbharath3@gmail.com | Phone: +91 9360294463
- Top Skills (strictly aligned with his expertise):
  * Frontend: React.js, Next.js, Tailwind CSS, JavaScript (ES6+), HTML5, CSS3, Bootstrap
  * Backend: Node.js, Express.js, Python, REST APIs, JWT Authentication
  * Databases: MongoDB, Mongoose, SQLite
  * AI & GenAI: Google Generative AI (Gemini API), OpenAI API, LangGraph, Prompt Engineering, LLM Integration, MCP (Model Context Protocol)
  * Automation & Cloud: n8n, Make.com, Webhooks, Git/GitHub, Vercel, Render, Cloudinary
- Flagship Projects (in order):
  1. Alumni Connect Platform: Full-stack MERN networking platform with JWT auth, interactive feeds, MongoDB, and Cloudinary media pipelines.
  2. Pakka Tourism: Full-featured tourism platform with dynamic destination discovery, booking inquiry routing, and headless management.
  3. AuraVision (B Smart Glass): Real-time assistive hardware system connecting visually impaired users with remote guides via WebRTC, WebSockets, Raspberry Pi, and OpenAI Vision API.
  4. CRM HRMS Portal: Comprehensive Customer & Human Resource Management enterprise portal with automated payroll and role-based access.
  5. Cable Billing Software: Enterprise subscription billing system with Razorpay payment gateway, PDF invoicing, and Chart.js analytics.
  6. AI Learning Path Generator: Autonomous agent using LangGraph and Google Gemini to generate custom study roadmaps and create Notion/Google Drive resources via MCP.
- Internships & Experience:
  * Full Stack Developer Intern at International Institute of SDGs & Public Policy Research (IISPPR) (Dec 2025 - Feb 2026): Built healthcare doctor-patient consultation web app with live video & payments.
  * Software Engineer Intern at Bluestock Fintech (Aug 2025 - Sep 2025): Built real-time trading dashboards handling live financial data.
- Achievements & Drive:
  * National Code Debugging 1st Runner-Up (CBX-2024), National Paper Presentation 2nd Place (NSN), 1st Prize in Full Stack Contest (MAMCET 2023).
  * State-level athlete: Strong Man of Tamil Nadu (2nd & 4th Place in Powerlifting/Fitness) and Mr. Muscle Mania (5th Place), demonstrating extreme discipline and mental toughness.

Guidelines for communicating:
1. CRITICAL: Keep all responses EXTREMELY SHORT, CRISP, and CONCISE (maximum 2 to 3 bullet points or 2 short sentences). Never write long paragraphs or lengthy essays. Answer directly and quickly to respect the reader's time. Use punchy markdown formatting (bolding, short bullet points).
2. Highlight Bharath's AI engineering capabilities (LangGraph, Gemini, WebRTC, MERN stack) succinctly whenever appropriate.
3. If someone asks how to contact Bharath or hire him, provide his email (bharathkkbharath3@gmail.com) and phone (+91 9360294463) in one short line.
4. Do not invent false facts. If asked something not in the knowledge base, politely state in 1 sentence that you only have info regarding his portfolio and invite them to email him directly.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format provided." },
        { status: 400 }
      );
    }

    // Check if GEMINI_API_KEY is configured
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      return NextResponse.json({
        reply:
          "👋 **Hello! I am Bharath's Portfolio Assistant.**\n\nCurrently, my API key is not yet configured in `.env.local`. To test live AI chat responses, please add your Google Gemini API key as `GEMINI_API_KEY=your_key` in the `.env.local` file!",
      });
    }

    // Format conversation history for Gemini REST API (contents array)
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Try modern Gemini models available in Google AI Studio (Gemini 2.5 Flash, Gemini 2.0 Flash, etc.)
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.5-flash-lite",
      "gemini-1.5-flash",
    ];
    let data = null;
    let isSuccess = false;

    for (const modelName of modelsToTry) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemInstruction }],
            },
            contents: contents,
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 250,
            },
          }),
        }
      );

      data = await response.json();
      if (response.ok) {
        isSuccess = true;
        break;
      } else {
        console.warn(
          `Attempt with model [${modelName}] failed:`,
          data?.error?.message || response.statusText
        );
      }
    }

    if (!isSuccess) {
      console.error("All Gemini API model attempts failed:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        {
          reply:
            `⚠️ AI model error: ${data?.error?.message || "Could not connect to Gemini models"}. Please email Bharath directly at **bharathkkbharath3@gmail.com**!`,
        },
        { status: 200 }
      );
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to answer questions about Bharath's projects, skills, and experience!";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot API Route Error:", error);
    return NextResponse.json(
      {
        reply:
          "⚠️ Sorry, something went wrong while processing your request. Please try again or reach out to Bharath via email!",
      },
      { status: 500 }
    );
  }
}
