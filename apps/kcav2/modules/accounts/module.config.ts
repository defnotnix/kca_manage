import { House } from "@phosphor-icons/react";
import { PropModuleConfig } from "@vframework/ui";

export const moduleConfig: PropModuleConfig = {
  bread: [
    {
      label: "KCA Admin",
    },
    {
      label: "Accounts",
    },
  ],
  moduleKey: "kca.accounts".split("."),
  endpoint: "/authenticate/users/",
  //
  moduleTerm: "Accounts",
  moduleTermPlural: "Accounts",
  moduleName: "Manage Accounts",
  moduleDescription: "Manage all player-invoices & their pricings.",
};
