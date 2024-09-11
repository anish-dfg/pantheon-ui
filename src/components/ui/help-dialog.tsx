import { PropsWithChildren } from "react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type HelpDialogProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export default function HelpDialog({
  title,
  description,
  children,
}: HelpDialogProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <QuestionMarkCircledIcon height={20} width={20} className="mt-4" />
        </DialogTrigger>
        <DialogContent className="overflow-scroll max-h-[30rem]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
