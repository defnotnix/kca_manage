import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Team Members",
    },
  ],
  moduleKey: "vauth.users.team.members".split("."),
  endpoint: "/players/teams/",
  //
  moduleTerm: "Team Member",
  moduleTermPlural: "Team Members",
  moduleName: "Team Member",
  moduleDescription: "Manage all player-sessions & their pricings.",
};
