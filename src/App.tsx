import { Outlet } from "react-router-dom";
import { Navbar } from "./components/nav/Navbar";

import { Toaster } from "~/components/ui/sonner";

export const App = () => {
  return (
    <div className="flex flex-col h-screen dark:bg-space dark:text-offwhite">
      <Navbar />
      <Outlet />
      <Toaster
        richColors
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "rounded-md w-full flex items-center p-4 shadow-md gap-2",
            title: "text-sm",
            description: "text-sm",
            // icon: "mr-2",
            cancelButton: "text-xs cursor-pointer border rounded-md p-1",
          },
        }}
      />
    </div>
  );
};
