import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://clipzy.ai"), // Update this when you have your domain
  title: "Clipzy AI — Edit Like Viral Creators Without Editing",
  description:
    "Upload a viral video. Upload your footage. Clipzy AI recreates the editing style automatically. AI-powered video editing that matches viral content styles.",
  keywords: ["AI video editing", "viral video editor", "video editing automation", "Clipzy AI", "content creation tools"],
  authors: [{ name: "Forge Studios" }],
  openGraph: {
    title: "Clipzy AI — Edit Like Viral Creators Without Editing",
    description:
      "Upload a viral video. Upload your footage. Clipzy AI recreates the editing style automatically.",
    type: "website",
    url: "/",
    siteName: "Clipzy AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipzy AI — Edit Like Viral Creators",
    description: "Recreate the editing style of viral videos automatically with Clipzy AI.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
