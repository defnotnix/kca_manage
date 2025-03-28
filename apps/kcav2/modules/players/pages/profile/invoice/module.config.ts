import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "Player",
    },
    {
      label: "Student Invoices",
    },
  ],
  moduleKey: "vauth.users.invoice".split("."),
  endpoint: "/billing/invoice/",
  //
  moduleTerm: "Student Invoice",
  moduleTermPlural: "Student Invoices",
  moduleName: "Student Invoice",
  moduleDescription: "Manage all player-packages & their pricings.",
};
