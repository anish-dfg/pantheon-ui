import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "~/App";
import { Auth0Protected } from "~/components/auth/Auth0Protected";
import { Auth0RbacGuard } from "~/components/auth/Auth0RbacGuard";
import { Forbidden } from "~/components/auth/Forbidden";

import { LandingPage } from "~/pages/LandingPage";
import { DashboardPage } from "~/pages/DashboardPage";
import { DashboardPageSkeleton } from "~/pages/DashboardPageSkeleton";

import "~/dist.css";
import { ErrorPage } from "./pages/ErrorPage";
import { SmartViewPage } from "./pages/SmartViewPage";
import { ImportAirtableBase } from "./components/dashboard/ImportAirtableBase";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <Auth0RbacGuard
            component={DashboardPage}
            fallback={DashboardPageSkeleton}
            permissions={["create:volunteers", "read:cycles"]}
          />
        ),
      },
      {
        path: "/import-airtable-base",
        element: <Auth0Protected component={ImportAirtableBase} />,
      },
      {
        path: "/smart-view/:projectCycleId/:smartViewType",
        element: <Auth0Protected component={SmartViewPage} />,
      },
      {
        path: "/forbidden",
        element: <Auth0Protected component={Forbidden} />,
      },
      {
        path: "/error",
        element: <Auth0Protected component={ErrorPage} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      authorizationParams={{
        redirect_uri: window.location.origin + "/dashboard",
        audience: "https://pantheon.developforgood.org/api",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>,
);
