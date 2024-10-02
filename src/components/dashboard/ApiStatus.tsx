import { TbApi } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ApiDetails } from "~/intf/entities";

type ApiStatusProps = {
  status: number;
  details: ApiDetails;
};

export const ApiStatus = ({ status, details }: ApiStatusProps) => {
  const hasNoopServices = Object.values(details.configuredServices).some(
    (v) => v === "noop",
  );

  return (
    <Card className="w-full rounded-md border shadow-md border-space bg-offwhite dark:border-offwhite dark:bg-space dark:text-offwhite">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl text-center">API Status</h2>
            <FaCircle
              className={status === 200 ? "text-success" : "text-error"}
            />
          </div>
          <TbApi size={30} />
        </CardTitle>
        <Separator className="bg-lightgray" />
        <CardDescription className="text-md">
          Configured Services
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {Object.entries(details.configuredServices).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <Badge className="bg-purple-400 text-offwhite">{key}</Badge>
            <div className="flex gap-2 items-center">
              <p className="italic">{value}</p>{" "}
              {value === "noop" && <FaCircle className="text-warning" />}
            </div>
          </div>
        ))}
      </CardContent>
      <Separator className="bg-lightgray w-[85%] ml-[7.5%]" />

      <CardFooter className="flex flex-col justify-between">
        {hasNoopServices && (
          <div className="flex items-center my-2 text-sm italic text-mediumgray dark:text-lightgray">
            The services marked by a yellow circle are not configured for
            production.
          </div>
        )}

        <Separator className="bg-lightgray" />
        <p className="self-start mt-2 text-xs text-left">
          API addr: {import.meta.env.VITE_API_BASE_URL}
        </p>
      </CardFooter>
    </Card>
  );
};
