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

export const navItemsVStore = [
  {
    label: "Dashboard",
    icon: ChartDonut,
    value: "/dashboard",
  },
  {
    label: "POS",
    icon: Desk,
    value: "/pos",
  },
  {
    label: "Products",
    icon: Package,
    value: "/products",
    children: [
      { label: "Product Catalog", value: "/support/faqs" },
      { label: "Product Drafts", value: "/support/docs" },
      { label: "Add Product", value: "/support/faqs" },
    ],
  },
  {
    label: "Categorization",
    icon: Package,
    value: "/category",
    children: [
      { label: "Brands", value: "/support/faqs" },
      { label: "Product Type", value: "/support/faqs" },
      { label: "Attributes", value: "/support/faqs" },
      { label: "Filter Groups", value: "/support/docs" },
      { label: "Developer Portal", value: "/support/docs" },
    ],
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    value: "/products",
    children: [
      { label: "Orders", value: "/support/faqs" },
      { label: "New Orders", value: "/support/docs" },
      { label: "Order Tracking", value: "/support/docs" },
      { label: "Add Order", value: "/support/faqs" },
    ],
  },
  {
    label: "Customers",
    icon: Users,
    value: "/customers",
  },
  {
    label: "Marketing",
    icon: FlyingSaucer,
    value: "/products",
  },
  {
    label: "Events",
    icon: Calendar,
    value: "/products",
  },
  {
    label: "Transactions",
    icon: Money,
    value: "/products",
  },
  {
    label: "Configure",
    icon: GearSix,
    value: "/products",
    children: [
      { label: "General Settings", value: "/support/docs" },
      { label: "Organization", value: "/support/faqs" },
      { label: "Checkout Settings", value: "/support/faqs" },
    ],
  },
  {
    label: "About Software",
    icon: Info,
    value: "/about",
  },
];
