import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "Player",
    },
    {
      label: "Performances",
    },
  ],
  moduleKey: "vauth.users.performance".split("."),
  endpoint: "/players/grading/",
  //
  moduleTerm: "Performance",
  moduleTermPlural: "Performances",
  moduleName: "Performance",
  moduleDescription: "Manage all player-packages & their pricings.",
};
