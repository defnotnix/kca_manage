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
      label: "Add Ons",
    },
  ],
  moduleKey: "vauth.service.addoncategory".split("."),
  endpoint: "/services/addons/category/",
  //
  moduleTerm: "Add-on Category",
  moduleTermPlural: "Adds",
  moduleName: "Add-on Category",
  moduleDescription: "Manage all player-add-on categorys & their pricings.",
};
