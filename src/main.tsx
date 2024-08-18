import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "~/pages/LandingPage";
import "~/dist.css";
import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      clientId={import.meta.env.VITE_AUTH0_DEV_CLIENT_ID}
      domain={import.meta.env.VITE_AUTH0_DEV_DOMAIN}
      authorizationParams={{
        redirect_uri: window.location.origin + "/dashboard",
        audience: "https://pantheon.developforgood.org/api",
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>,
);
