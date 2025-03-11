import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Performances",
    },
  ],
  moduleKey: "vauth.users.attendance".split("."),
  endpoint: "/players/grading/",
  //
  moduleTerm: "Performance",
  moduleTermPlural: "Performances",
  moduleName: "Performance",
  moduleDescription: "Manage all player-packages & their pricings.",
};
