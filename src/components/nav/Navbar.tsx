import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "~/components/nav/DarkModeSwitch";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  const { isAuthenticated, getIdTokenClaims, isLoading, logout } = useAuth0();

  useEffect(() => {
    getIdTokenClaims().then((claims) => {
      if (!claims) {
        return;
      }
      if (claims.name) {
        setName(claims.name);
      }
      if (claims.picture) {
        setPicture(claims.picture);
      }
    });
  });

  console.log(getIdTokenClaims());

  return (
    <div className="flex sticky justify-between items-center h-20 text-gray-100 bg-transparent dark:shadow-md dark:text-offwhite">
      <img
        src="https://cdn.prod.website-files.com/62d7c8cb6f11a35f47072653/650a327aee4574b4afe11724_Develop%20for%20Good%20Logo-p-500.png"
        alt="develop for good engineering"
        className="h-3/5 cursor-pointer ml-[1.5rem]"
        onClick={() => {
          navigate("/dashboard");
        }}
      />
      <div className="flex gap-8 items-center pr-6">
        <DarkModeSwitch />
        {!isLoading && isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={picture}
                  alt="profile"
                  className="cursor-pointer"
                />
                <AvatarFallback>
                  {name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Button
                  className="pl-0 bg-transparent shadow-none"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
