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
  moduleDescription: "Manage players under the current session.",
};
