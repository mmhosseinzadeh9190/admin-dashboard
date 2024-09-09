import { Outlet } from "react-router-dom";

function Main() {
  return (
    <main className="overflow-y-scroll bg-gray-100 px-10 py-8">
      <Outlet />
    </main>
  );
}

export default Main;
