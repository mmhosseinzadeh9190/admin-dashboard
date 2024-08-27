import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-[max-content_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="bg-gray-100 px-10 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
