import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Routine Management",
    },
  ],
  moduleKey: "vauth.users".split("."),
  endpoint: "/players/info/",
  //
  moduleTerm: "Routine",
  moduleTermPlural: "Routines",
  moduleName: "Routine Management",
  moduleDescription:
    "A centralized portal for managing all player-related data and activities.",
};
