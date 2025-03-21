import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Sessions",
    },
    {
      label: "Manage Sessions",
    },
  ],
  moduleKey: "vauth.sessions".split("."),
  endpoint: "/players/sessions/",
  //
  moduleTerm: "Session",
  moduleTermPlural: "Sessions",
  moduleName: "Session",
  moduleDescription: "Manage all player-sessions & their pricings.",
};
