import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import AIChatbot from "@/components/ui/AIChatbot";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Bharath K — AI Engineer & GenAI Architect",
  description:
    "World-class AI Engineer & Full-Stack Architect. Specializing in autonomous LangGraph agents, LLM orchestration pipelines, real-time WebRTC systems, and production-grade Next.js applications.",
  keywords: [
    "Bharath K",
    "AI Engineer",
    "GenAI Architect",
    "Full Stack Developer",
    "LangGraph",
    "OpenAI API",
    "Gemini API",
    "Next.js",
    "TypeScript",
    "WebRTC",
    "AI Agents",
  ],
  authors: [{ name: "Bharath K", url: "https://github.com/bharath9360" }],
  openGraph: {
    title: "Bharath K — AI Engineer & GenAI Architect",
    description:
      "Architecting autonomous agents, real-time LLM workflows, and production-grade web interfaces.",
    url: "https://bharathk.ai",
    siteName: "Bharath K Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#04050a] text-[#f3f4f6] selection:bg-[#00f2fe]/30 selection:text-white">
        <SmoothScroll>
          {children}
          <AIChatbot />
        </SmoothScroll>
      </body>
    </html>
  );
}

