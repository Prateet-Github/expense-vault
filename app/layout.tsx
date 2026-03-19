import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EdTech Assignment",
  description: "EdTech assignment built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
