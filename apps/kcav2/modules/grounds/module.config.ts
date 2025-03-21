import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Grounds",
    },
  ],
  moduleKey: "vauth.grounds".split("."),
  endpoint: "/services/grounds/",
  //
  moduleTerm: "Ground",
  moduleTermPlural: "Grounds",
  moduleName: "Ground",
  moduleDescription: "Manage all player-packages & their pricings.",
};
