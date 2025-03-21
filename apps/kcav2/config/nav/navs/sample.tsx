import {
  Building,
  Calendar,
  ChartDonut,
  Clock,
  Cricket,
  Gear,
  Invoice,
  Package,
  Users,
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
    icon: Users,
    value: "/sessions",
    children: [
      {
        label: "Manage Sessions",
        value: "/sessions",
      },
      {
        label: "Session Routine",
        value: "/routine",
      },
    ],
  },
  {
    label: "Players",
    icon: Users,
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
        label: "Booking Requests",
        value: "/bookings/requests",
      },
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
  },
  {
    label: "Accounts",
    icon: User,
    value: "/accounts",
  },
];
