import { useSearchParams } from "react-router-dom";

export const ErrorPage = () => {
  const [params] = useSearchParams();
  const error = params.get("error") || "An error occurred.";

  return (
    <div>
      <h1>{error}</h1>
    </div>
  );
};
