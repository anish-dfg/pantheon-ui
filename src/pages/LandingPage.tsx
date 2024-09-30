import { useAuth0 } from "@auth0/auth0-react";

import { LandingPageSkeleton } from "./LandingPageSkeleton";
import { Auth0LoginButton } from "~/components/auth/Auth0LoginButton";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useAuth0();

  if (isAuthenticated) navigate("/dashboard");

  return (
    <section className="flex overflow-y-scroll flex-1 justify-center items-center bg-offwhite dark:bg-black">
      {isLoading ? (
        <LandingPageSkeleton />
      ) : (
        <div className="flex gap-4 w-4/5 h-4/5 bg-offwhite rounded-md dark:bg-black">
          <div className="flex flex-col gap-6 justify-center p-5 pl-24 w-3/5">
            <h1 className="w-1/2 font-bold text-purple-400 text-[3.5rem] dark:text-pink-200">
              Pantheon
            </h1>
            <p className="text-black-100">
              Unified Data Management Tool for Develop For Good
            </p>
            <Auth0LoginButton className="w-1/2 max-w-28 px-5 py-6 text-gray-100 bg-purple-400 dark:bg-pink-200 dark:text-black rounded-md shadow-none hover:bg-purple-300 text-[1.25rem] dark:outline-pink-200 dark:hover:bg-pink-300 dark:hover:text-offwhite" />
          </div>
          <div className="flex">
            <img
              src="https://assets-global.website-files.com/62d7c8cb6f11a35f47072653/62d87fd0aeb2f66e573cac5e_nonprofit-hero.png"
              alt="develop for good"
              className="max-w-[90%] max-h-[90%] my-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
};
