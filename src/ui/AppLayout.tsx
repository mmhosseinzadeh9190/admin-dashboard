import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-[max-content_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
}

export default AppLayout;
