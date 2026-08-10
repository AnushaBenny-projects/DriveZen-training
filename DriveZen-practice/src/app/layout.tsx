import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Management",
  description: "Student Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          {" | "}
          <a href="/students">Students</a>
        </nav>

        {children}
      </body>
    </html>
  );
}