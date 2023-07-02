import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 px-7 py-5 text-slate-900">{children}</div>
      </div>
    </>
  );
}
