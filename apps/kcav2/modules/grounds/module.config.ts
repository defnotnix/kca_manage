import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Configure",
    },
    {
      label: "Grounds",
    },
  ],
  moduleKey: "vauth.configure.grounds".split("."),
  endpoint: "/services/grounds/",
  //
  moduleTerm: "Grounds",
  moduleTermPlural: "Grounds",
  moduleName: "Ground",
  moduleDescription: "Manage all grounds & their pricings.",
};
