import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Players",
    },
    {
      label: "Manage Players",
    },
  ],
  moduleKey: "vauth.players".split("."),
  endpoint: "/players/info/",
  //
  moduleTerm: "Player",
  moduleTermPlural: "Players",
  moduleName: "Player Management",
  moduleDescription:
    "A centralized portal for managing all player-related data and activities.",
};
