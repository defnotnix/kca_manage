import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Invoices",
    },
  ],
  moduleKey: "vauth.billing.invoice".split("."),
  endpoint: "/billing/invoice/",
  //
  moduleTerm: "Invoice",
  moduleTermPlural: "Invoices",
  moduleName: "Manage Invoices",
  moduleDescription: "Manage all player-invoices & their pricings.",
};
