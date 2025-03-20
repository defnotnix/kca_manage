import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Service Management",
    },
    {
      label: "Add-Ons",
    },
  ],
  moduleKey: "vauth.services.addons".split("."),
  endpoint: "/services/addons/",
  //
  moduleTerm: "Add-On's",
  moduleTermPlural: "Add-On's",
  moduleName: "Add-On's",
  moduleDescription: "Manage all player-add-on categorys & their pricings.",
};
