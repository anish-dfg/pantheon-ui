import { Outlet } from "react-router-dom";
import { Navbar } from "./components/nav/Navbar";

import { Toaster } from "~/components/ui/sonner";

export const App = () => {
  return (
    <div className="flex flex-col h-screen dark:bg-space dark:text-offwhite">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};
