import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "New Attendance",
    },
  ],
  moduleKey: "vauth.attendance".split("."),
  endpoint: "/players/grading/",
  //
  moduleTerm: "Performance",
  moduleTermPlural: "Performances",
  moduleName: "Performance",
  moduleDescription:
    "A centralized portal for managing all player-related data and activities.",
};
