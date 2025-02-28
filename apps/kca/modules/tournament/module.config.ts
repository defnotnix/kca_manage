import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Tournaments",
    },
  ],
  moduleKey: "vauth.users".split("."),
  endpoint: "/users",
  //
  moduleTerm: "Tournament",
  moduleTermPlural: "Tournaments",
  moduleName: "Manage Tournaments",
  moduleDescription: "Manage all player-tournaments & their pricings.",
};
