import "./globals.css";
import { figtree } from "@/libs/fonts";
import Provider from "@/components/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        className={`flex min-h-screen flex-col bg-slate-50 text-slate-900 ${figtree.className} antialiased`}>
        <Provider>{children}</Provider>
        <ToastContainer
          bodyClassName={figtree.className}
          position="bottom-left"
        />
      </body>
    </html>
  );
}
