import {
  Calendar,
  ChartDonut,
  Cricket,
  Invoice,
  Package,
  User,
  GearSix,
} from "@phosphor-icons/react";
import { PropAdminNavItems } from "@vframework/ui";

export const navItems: PropAdminNavItems[] = [
  {
    label: "Dashboard",
    icon: ChartDonut,
    value: "/dashboard",
  },
  {
    label: "Sessions",
    icon: Calendar,
    value: "/sessions",
    children: [
      {
        label: "Manage Sessions",
        value: "/sessions",
      },
      {
        label: "Add Session Routine",
        value: "/routines/new",
      },
    ],
  },
  {
    label: "Players",
    icon: User,
    value: "/players",
  },

  {
    label: "Player Addon's",
    icon: Package,
    value: "/playeraddon",
    children: [
      {
        label: "Teams",
        value: "/teams",
      },
      {
        label: "Tournaments",
        value: "/tournaments",
      },
    ],
  },

  {
    label: "Services",
    icon: Cricket,
    value: "/services",
    children: [
      {
        label: "Packages",
        value: "/packages",
      },
      {
        label: "Add-On's",
        value: "/addons",
      },
    ],
  },
  {
    label: "Manage Bookings",
    icon: Calendar,
    value: "/bookings",
    children: [
      {
        label: "Booking",
        value: "/bookings",
      },
      {
        label: "New Booking",
        value: "/bookings/new",
      },
    ],
  },
  {
    label: "Configure",
    icon: GearSix,
    value: "/config",
    children: [
      {
        label: "Timings",
        value: "/timings",
      },
      {
        label: "Grounds",
        value: "/grounds",
      },
    ],
  },
  {
    label: "Invoices",
    icon: Invoice,
    value: "/invoices",
    children: [
      {
        label: "All Invoices",
        value: "/invoices",
      },
      {
        label: "Pending Invoices",
        value: "/pending-invoices",
      },
    ],
  },
  {
    label: "Accounts",
    icon: User,
    value: "/accounts",
  },
];
