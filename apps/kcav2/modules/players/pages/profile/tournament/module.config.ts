import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "Player",
    },
    {
      label: "Tournaments",
    },
  ],
  moduleKey: "kca.players.tournament".split("."),
  endpoint: "/players/tournament/sorted/",
  //
  moduleTerm: "Tournament",
  moduleTermPlural: "Tournaments",
  moduleName: "Tournament",
  moduleDescription: "Manage all player-packages & their pricings.",
};
