import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Projects from "./pages/Projects";
import Schedule from "./pages/Schedule";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="projects" element={<Projects />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="activity" element={<Activity />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
