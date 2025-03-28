import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "Player",
    },
    {
      label: "Achievements",
    },
  ],
  moduleKey: "vauth.users.ahievement".split("."),
  endpoint: "/players/achievements/",
  //
  moduleTerm: "Achievement",
  moduleTermPlural: "Achievements",
  moduleName: "Achievement",
  moduleDescription: "Manage all player-packages & their pricings.",
};
