import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Services",
    },
    {
      label: "Packages",
    },
  ],
  moduleKey: "vauth.packages".split("."),
  endpoint: "/services/packages/",
  //
  moduleTerm: "Package",
  moduleTermPlural: "Packages",
  moduleName: "Package",
  moduleDescription: "Manage all player-packages & their pricings.",
};
