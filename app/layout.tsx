import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mother Teresa Memorial School | Sahibganj",
  description: "Quality Education, Strong Values. Located in Kauri Khutana, Bhagaiya, Sahibganj. Providing English-medium education since 2005.",
  keywords: ["School in Sahibganj", "Best school in Bhagaiya", "MTMS Sahibganj", "English medium school Jharkhand"],
  openGraph: {
    title: "Mother Teresa Memorial School",
    description: "Shaping Bright Futures. Admissions Open for 2025-26.",
    siteName: "MTMS",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FDFDFD]">
        {children}
      </body>
    </html>
  );
}