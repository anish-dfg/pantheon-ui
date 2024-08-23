// import { useAuth0 } from "@auth0/auth0-react";

import { Job } from "~/components/dashboard/jobs/Job";
import { LandingPageSkeleton } from "./LandingPageSkeleton";

export const LandingPage = () => {
  // const { isAuthenticated, isLoading } = useAuth0();
  return (
    <section className="min-h-screen bg-gray-100">
      <LandingPageSkeleton />
      <Job
        id="c3ad9a49-65f6-dw34-ds35-asdfgfdsasdfg"
        projectCycleId="c3ad9a49-65f6-dw34-ds35-asdfgfdsasdfg"
        status="complete"
        label="ImportData"
        createdAt="06-25-2024"
        description="Insert Description"
        details="Insert Detail"
      />
      <Job
        id="c3ad9a49-65f6-dw34-ds35-asdfgfdsasdfg"
        status="complete"
        label="ImportData"
        createdAt="06-21-2024"
        details="Insert Detail"
      />
    </section>
  );
};
