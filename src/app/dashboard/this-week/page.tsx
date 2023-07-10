import Main from "@/components/DashboardMain";

const ThisWeek = () => {
  return (
    <main className="flex-1 px-7 py-5 text-slate-900">
      <Main filter="this-week" />
    </main>
  );
};

export default ThisWeek;
