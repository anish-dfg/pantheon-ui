import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { ComponentType } from "react";
import { Forbidden } from "./Forbidden";
import useAPI from "~/hooks/useAPI";

export const Auth0RbacGuard = ({
  component,
  fallback: Fallback,
  permissions: requiredPermissions,
  ...componentProps
}: {
  component: ComponentType;
  fallback: ComponentType;
} & {
  permissions: string[];
}) => {
  const api = useAPI();

  const { data: userPermissions, isLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      return await api.getPermissions();
    },
  });

  if (isLoading) {
    return <Fallback />;
  }

  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions?.includes(permission),
  );

  if (!hasAllPermissions) {
    return <Forbidden />;
  }

  const Wrapped = withAuthenticationRequired(component);
  return <Wrapped {...componentProps} />;
};
