import { useParams } from "react-router-dom";
import { VolunteersSmartView } from "~/components/dashboard/views/VolunteersSmartView";

export const SmartViewPage = () => {
  const { projectCycleId, smartViewType } = useParams();

  if (smartViewType === "volunteers") {
    return (
      <div className="p-6 m-2">
        <VolunteersSmartView projectCycleId={projectCycleId!} />
      </div>
    );
  }
  return <div>HERE</div>;
};
