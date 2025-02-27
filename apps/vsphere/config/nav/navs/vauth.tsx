import {
  Building,
  Calendar,
  ChartDonut,
  ChartLine,
  Desk,
  FlyingSaucer,
  Gear,
  GearSix,
  Hand,
  Headphones,
  Headset,
  Info,
  Key,
  MathOperations,
  Money,
  Package,
  Shield,
  ShoppingBag,
  Users,
} from "@phosphor-icons/react";
import { PropAdminNavItems, PropAdminNavModule } from "@vframework/ui";

export const navItemsVAuth = [
  {
    label: "Dashboard",
    icon: ChartDonut,
    value: "/dashboard",
  },

  {
    label: "v.Auth",
    icon: Key,
    value: "/organization",
    children: [
      { label: "Users", value: "/vauth/users" },
      { label: "User Groups", value: "/vauth/user-groups" },
      { label: "Dev Mode", value: "/vauth/ev" },
      { label: "Auth Test", value: "/vauth/login" },
    ],
  },
  {
    label: "Organization",
    icon: Building,
    value: "/organization",
    children: [
      { label: "Company Profile", value: "/organization/profile" },
      { label: "Departments", value: "/organization/departments" },
      { label: "Locations", value: "/organization/locations" },
    ],
  },
];
