import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Tournaments",
    },
  ],
  moduleKey: "vauth.users.tournament".split("."),
  endpoint: "/players/info/tournament/",
  //
  moduleTerm: "Tournament",
  moduleTermPlural: "Tournaments",
  moduleName: "Tournament",
  moduleDescription: "Manage all player-packages & their pricings.",
};
