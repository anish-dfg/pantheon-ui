import { ComponentType } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export type StatCardProps = {
  title: string;
  content: string | number;
  description?: string;
  icon: ComponentType;
};

export const StatCard = ({
  title,
  content: value,
  description,
  icon: Icon,
}: StatCardProps) => {
  return (
    <Card className="border shadow-md border-mediumgray dark:bg-space dark:text-offwhite">
      <CardHeader className="p-6 pb-2">
        <div className="flex justify-between items-center w-48">
          <CardTitle className="text-sm">{title}</CardTitle>
          <Icon />
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-2">
        <CardDescription className="text-3xl font-bold">
          {value}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-2 text-sm text-lightgray">
        {description}
      </CardFooter>
    </Card>
  );
};
