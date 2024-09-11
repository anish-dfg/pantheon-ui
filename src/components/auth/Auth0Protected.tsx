import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

export const Auth0Protected = ({
  component,
  ...componentProps
}: {
  component: ComponentType;
}) => {
  const Wrapped = withAuthenticationRequired(component);
  return <Wrapped {...componentProps} />;
};
