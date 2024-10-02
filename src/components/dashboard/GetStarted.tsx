// import { CreateAirtableView } from "~/components/dashboard/CreateAirtableView";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { MdStart } from "react-icons/md";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <Card className="w-full rounded-md border shadow-md border-space bg-offwhite dark:border-offwhite dark:bg-space dark:text-offwhite">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl text-center">Get Started</h2>
          </div>
          <MdStart size={30} />
        </CardTitle>
        <Separator className="bg-lightgray" />
        <CardDescription className="text-md">
          Add a new datasource
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button
          className="hover:border bg-space text-offwhite dark:text-space dark:bg-offwhite hover:border-space hover:bg-offwhite hover:text-space"
          onClick={() => navigate("/import-airtable-base")}
        >
          Import Airtable Base
        </Button>
      </CardContent>
    </Card>
  );
};
