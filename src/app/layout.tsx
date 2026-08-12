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
  title: "Bharath K | Full Stack Developer & AI Specialist",
  description:
    "Portfolio of Bharath K. I build scalable MERN & Next.js web applications, AI automation workflows, and IoT solutions.",
  keywords: [
    "Bharath K",
    "Full Stack Developer",
    "Next.js Developer",
    "MERN Stack",
    "AI Automation",
    "Make.com",
    "Freelancer",
    "Chennai",
    "Portfolio"
  ],
  metadataBase: new URL("https://bharathk.online"),
  openGraph: {
    title: "Bharath K | Full Stack Developer & AI Specialist",
    description:
      "Portfolio of Bharath K. I build scalable MERN & Next.js web applications, AI automation workflows, and IoT solutions.",
    url: "https://bharathk.online",
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

