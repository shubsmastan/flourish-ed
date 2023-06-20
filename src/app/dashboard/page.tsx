import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar selectedClass="" />
        <Main />
      </div>
    </>
  );
};

export default Dashboard;
