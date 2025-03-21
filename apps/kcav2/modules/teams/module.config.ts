import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Teams",
    },
  ],
  moduleKey: "vauth.users.team".split("."),
  endpoint: "/players/teams/",
  //
  moduleTerm: "Team",
  moduleTermPlural: "Teams",
  moduleName: "Team",
  moduleDescription: "Manage all player-sessions & their pricings.",
};
