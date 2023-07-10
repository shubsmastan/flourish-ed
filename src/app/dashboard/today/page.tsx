import Main from "@/components/DashboardMain";

const Today = () => {
  return (
    <main className="flex-1 px-7 py-5 text-slate-900">
      <Main filter="today" />
    </main>
  );
};

export default Today;
