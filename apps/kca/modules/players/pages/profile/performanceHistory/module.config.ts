import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Performances History",
    },
  ],
  moduleKey: "vauth.users.attendance".split("."),
  endpoint: "/players/grading/",
  //
  moduleTerm: "Performance History",
  moduleTermPlural: "Performance History",
  moduleName: "Performance History",
  moduleDescription: "All saved performance gradings..",
};
