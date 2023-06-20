import "./globals.css";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "Flourish Education",
  description:
    "A lesson planning app for teachers, created with Next.js, TypeScript and MongoDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen text-slate-900 bg-slate-50 ${lato.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
