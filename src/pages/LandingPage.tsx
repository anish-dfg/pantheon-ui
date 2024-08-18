// import { useAuth0 } from "@auth0/auth0-react";

import { LandingPageSkeleton } from "./LandingPageSkeleton";

export const LandingPage = () => {
  // const { isAuthenticated, isLoading } = useAuth0();
  return (
    <section className="min-h-screen bg-gray-100">
      <LandingPageSkeleton />
    </section>
  );
};
