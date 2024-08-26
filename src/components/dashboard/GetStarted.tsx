import { CreateAirtableView } from "~/components/dashboard/CreateAirtableView";

export const GetStarted = () => {
  return (
    <div className="flex flex-col gap-4 justify-self-center self-center my-auto w-[60%] shadow-md">
      <CreateAirtableView />
    </div>
  );
};
