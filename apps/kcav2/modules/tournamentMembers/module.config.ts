import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Tournament Members",
    },
  ],
  moduleKey: "vauth.users.tournament.members".split("."),
  endpoint: "/players/tournament/",
  //
  moduleTerm: "Tournament Member",
  moduleTermPlural: "Tournament Members",
  moduleName: "Tournament Member",
  moduleDescription: "Manage all player-sessions & their pricings.",
};
