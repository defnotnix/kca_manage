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
} from "@phosphor-icons/react";
import { PropAdminNavItems } from "@vframework/ui";

export const navItems: PropAdminNavItems[] = [
  {
    label: "Dashboard",
    icon: ChartDonut,
    value: "/dashboard",
  },
  {
    label: "Player Management",
    icon: Users,
    value: "/users",
    children: [
      { label: "Players", value: "/players" },
      {
        label: "Teams",
        value: "/teams",
      },
      {
        label: "Tournaments",
        value: "/tournaments",
      },
      {
        label: "Routine",
        value: "/routine",
      },
    ],
  },
  {
    label: "Service Management",
    icon: Gear,
    value: "#",
    children: [
      { label: "Grounds", value: "/grounds" },
      { label: "Packages", value: "/packages" },
      { label: "Add-Ons", value: "/addons" },
      { label: "Routines", value: "/routines" },
    ],
  },
  {
    label: "Sessions",
    icon: Clock,
    value: "/sessions",
  },

  {
    label: "Bookings",
    icon: Calendar,
    value: "/booking",
    children: [
      { label: "Booking Requests", value: "/booking-requests" },
      { label: "Active Bookings", value: "?filter=active" },
      { label: "All Bookings", value: "/bookings" },
      { label: "Add Booking", value: "/bookings/new" },
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
