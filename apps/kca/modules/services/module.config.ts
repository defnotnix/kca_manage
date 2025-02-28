import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Services/Grounds",
    },
  ],
  moduleKey: "kca.services".split("."),
  endpoint: "/users",
  //
  moduleTerm: "Services/Grounds",
  moduleTermPlural: "Services/Grounds",
  moduleName: "Services/Grounds",
  moduleDescription: "Manage all player-services/grounds & their pricings.",
};
