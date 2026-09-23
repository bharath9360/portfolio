import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import AIChatbot from "@/components/ui/AIChatbot";
import { ThemeProvider } from "@/context/ThemeContext";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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

// Preload the first cinematic frame so it starts downloading before React boots
// This improves LCP (Largest Contentful Paint) for the hero canvas
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-theme="dark"
    >
      <head>
        {/* Preload first cinematic frame – critical for hero LCP */}
        <link
          rel="preload"
          as="image"
          href="/cinematic/scene-01/frames/webp/ezgif-frame-001.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/cinematic/scene-01/frames/ezgif-frame-001.jpg"
          type="image/jpeg"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[var(--bg-obsidian)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[#00f2fe]/30 selection:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScroll>
            {children}
            <AIChatbot />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
