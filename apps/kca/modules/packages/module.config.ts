import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Packages",
    },
  ],
  moduleKey: "vauth.users".split("."),
  endpoint: "/users",
  //
  moduleTerm: "Package",
  moduleTermPlural: "Packages",
  moduleName: "Package",
  moduleDescription:
    "Manage all player-packages & their pricings.",
};
