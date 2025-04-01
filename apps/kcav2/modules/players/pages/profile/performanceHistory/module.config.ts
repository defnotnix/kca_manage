import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "Player",
    },
    {
      label: "Performances History",
    },
  ],
  moduleKey: "vauth.users.performance.history".split("."),
  endpoint: "/players/grading/history/",
  //
  moduleTerm: "Performance History",
  moduleTermPlural: "Performance History",
  moduleName: "Performance History",
  moduleDescription: "All saved performance gradings..",
};
