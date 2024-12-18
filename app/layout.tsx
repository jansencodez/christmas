import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load Google Fonts with variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the application
export const metadata: Metadata = {
  title: "Christmas Countdown",
  description:
    "Countdown to Christmas with festive animations and joyful designs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-red-500 via-green-500 to-white text-gray-900 antialiased`}
      >
        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-center text-3xl font-bold text-red-700">
              Christmas Countdown 🎄
            </h1>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-green-700 text-white py-4">
          <div className="text-center">
            Made with ❤️ for Christmas © {new Date().getFullYear()}
          </div>
        </footer>
      </body>
    </html>
  );
}
