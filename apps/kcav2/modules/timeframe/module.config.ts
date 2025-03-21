import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Service Management",
    },
    {
      label: "Bookings",
    },
  ],
  moduleKey: "vauth.timings".split("."),
  endpoint: "/services/time/frames/",
  //
  moduleTerm: "Time Frame",
  moduleTermPlural: "Time Frames",
  moduleName: "Time Frames",
  moduleDescription:
    "Manage organization active times. This will be used for sessions & bookings.",
};
