import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pick Story - Share and Discover Stories",
  description: "A platform for sharing stories, reading others' experiences, and connecting through storytelling. Pick a random story daily and share your thoughts.",
  keywords: ["stories", "storytelling", "community", "sharing", "reading"],
  authors: [{ name: "Pick Story Team" }],
  openGraph: {
    title: "Pick Story - Share and Discover Stories",
    description: "A platform for sharing stories, reading others' experiences, and connecting through storytelling.",
    type: "website",
    url: "https://tanthuann.github.io/demo-la/",
    siteName: "Pick Story",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pick Story - Share and Discover Stories",
    description: "A platform for sharing stories, reading others' experiences, and connecting through storytelling.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}