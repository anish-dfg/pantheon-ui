import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export type InfoTooltipProps = {
  tooltipMessage: string;
};

export const InfoTooltip = ({ tooltipMessage }: InfoTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoCircledIcon className="mr-1 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="rounded-md text-space max-w-[15rem] dark:bg-offwhite">
          <p>{tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
