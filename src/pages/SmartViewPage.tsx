import { useParams } from "react-router-dom";

export const SmartViewPage = () => {
  const { projectCycleId, smartViewType } = useParams();
  console.log(projectCycleId, smartViewType);
  return <div>HERE</div>;
};
