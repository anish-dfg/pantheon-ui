import { CycleTabs } from "./CycleTabs";

type CycleDashboardProps = {
  projectCycleId: string;
};

export const CycleDashboard = ({ projectCycleId }: CycleDashboardProps) => {
  return (
    <div className="flex flex-col">
      <CycleTabs projectCycleId={projectCycleId} />
    </div>
  );
};
