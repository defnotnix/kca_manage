import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Pending Invoices",
    },
  ],
  moduleKey: "vauth.billing.pending.invoice".split("."),
  endpoint: "/billing/invoice/",
  //
  moduleTerm: "Invoice",
  moduleTermPlural: "Invoices",
  moduleName: "Invoices",
  moduleDescription: "Manage all player-invoices & their pricings.",
};
