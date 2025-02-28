import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Player Management",
    },
  ],
  moduleKey: "vauth.users".split("."),
  endpoint: "/users",
  //
  moduleTerm: "Player",
  moduleTermPlural: "Players",
  moduleName: "Player Management",
  moduleDescription:
    "A centralized portal for managing all player-related data and activities.",
};
