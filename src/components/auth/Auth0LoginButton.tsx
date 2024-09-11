import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "~/components/ui/button";

export const Auth0LoginButton = ({ className }: { className: string }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="default"
      // className="text-gray-100 bg-purple-300 rounded-sm shadow-md hover:bg-pink-300 text-[1.25rem]"
      className={className}
      onClick={() => loginWithRedirect()}
    >
      Sign In
    </Button>
  );
};
