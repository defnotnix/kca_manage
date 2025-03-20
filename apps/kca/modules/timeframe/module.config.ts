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
  moduleKey: "vauth.users".split("."),
  endpoint: "/services/time/frames/",
  //
  moduleTerm: "Time Frame",
  moduleTermPlural: "Time Frames",
  moduleName: "Time Frames",
  moduleDescription: "Manage all time frames for booking.",
};
