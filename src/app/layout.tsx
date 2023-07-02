import "./globals.css";
import { figtree } from "@/libs/fonts";
import Provider from "@/components/Provider";

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
        className={`flex flex-col min-h-screen text-slate-900 bg-slate-50 ${figtree.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
