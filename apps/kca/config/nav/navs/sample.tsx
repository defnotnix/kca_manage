import {
  Building,
  Calendar,
  ChartDonut,
  ChartLine,
  Clock,
  Cricket,
  Desk,
  FlyingSaucer,
  Gear,
  GearSix,
  Hand,
  Headphones,
  Headset,
  Info,
  Invoice,
  Key,
  MathOperations,
  Money,
  Package,
  Shield,
  ShoppingBag,
  Users,
} from "@phosphor-icons/react";
import { PropAdminNavItems, PropAdminNavModule } from "@vframework/ui";

export const navItems: PropAdminNavItems[] = [
  {
    label: "Dashboard",
    icon: ChartDonut,
    value: "/dashboard",
  },

  {
    label: "Players",
    icon: Users,
    value: "/players",
  },
  {
    label: "Packages",
    icon: Package,
    value: "/package",
  },
  {
    label: "Sessions",
    icon: Clock,
    value: "/sessions",
  },
  {
    label: "Tournaments",
    icon: Cricket,
    value: "/tournaments",
  },
  {
    label: "Bookings",
    icon: Calendar,
    value: "/booking",
    children: [
      { label: "Booking Requests", value: `?filter=request` },
      { label: "Active Bookings", value: `?filter=active` },
      { label: "All Bookings", value: "/" },
      { label: "Add Booking", value: "/new" },
      { label: "Services", value: "/services" },
    ],
  },
  {
    label: "Invoices",
    icon: Invoice,
    value: "/invoices",
  },
  {
    label: "Configure",
    icon: GearSix,
    value: "/people",
    children: [{ label: "Accounts", value: "/people/employees" }],
  },
];
