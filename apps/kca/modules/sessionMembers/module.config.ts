import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Session Members",
    },
  ],
  moduleKey: "vauth.session.members".split("."),
  endpoint: "/players/sessions/",
  //
  moduleTerm: "Session Member",
  moduleTermPlural: "Session Members",
  moduleName: "Session Member",
  moduleDescription: "Manage all player-sessions & their pricings.",
};
