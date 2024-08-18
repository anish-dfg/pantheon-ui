import { cn } from "~/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // dark:bg-slate-50/10
  return (
    <div className={cn("animate-pulse rounded-md", className)} {...props} />
  );
}

export { Skeleton };
