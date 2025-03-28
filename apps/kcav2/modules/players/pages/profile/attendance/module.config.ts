import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "Player",
    },
    {
      label: "Attendances",
    },
  ],
  moduleKey: "vauth.users.attendance".split("."),
  endpoint: "/players/attendance/",
  //
  moduleTerm: "Attendance",
  moduleTermPlural: "Attendances",
  moduleName: "Attendance",
  moduleDescription: "Manage all player-packages & their pricings.",
};
